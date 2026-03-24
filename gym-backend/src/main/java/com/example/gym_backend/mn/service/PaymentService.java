package com.example.gym_backend.mn.service;

import com.example.gym_backend.mn.dto.OrderRequest;
import com.example.gym_backend.mn.dto.OrderResponse;
import com.example.gym_backend.mn.dto.VerifyPaymentRequest;
import com.example.gym_backend.mn.model.AppUser;
import com.example.gym_backend.mn.model.PaymentRecord;
import com.example.gym_backend.mn.repository.AppUserRepository;
import com.example.gym_backend.mn.repository.PaymentRecordRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PaymentService {

    private final String razorpayKeyId;
    private final String razorpayKeySecret;
    private final AppUserRepository userRepository;
    private final PaymentRecordRepository paymentRecordRepository;
    private final SubscriptionService subscriptionService;

    public PaymentService(
            @Value("${app.razorpay.key-id}") String razorpayKeyId,
            @Value("${app.razorpay.key-secret}") String razorpayKeySecret,
            AppUserRepository userRepository,
            PaymentRecordRepository paymentRecordRepository,
            SubscriptionService subscriptionService
    ) {
        this.razorpayKeyId = razorpayKeyId;
        this.razorpayKeySecret = razorpayKeySecret;
        this.userRepository = userRepository;
        this.paymentRecordRepository = paymentRecordRepository;
        this.subscriptionService = subscriptionService;
    }

    public OrderResponse createOrder(OrderRequest request) throws Exception {
        RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        JSONObject payload = new JSONObject();
        payload.put("amount", request.amount() * 100);
        payload.put("currency", request.currency());
        payload.put("receipt", "mn_" + System.currentTimeMillis());
        payload.put("payment_capture", 1);

        Order order = razorpay.orders.create(payload);
        return new OrderResponse(
                razorpayKeyId,
                order.get("id"),
                request.amount() * 100,
                request.currency(),
                request.planCode()
        );
    }

    public Map<String, String> verifyPayment(String email, VerifyPaymentRequest req) throws Exception {
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", req.razorpayOrderId());
        options.put("razorpay_payment_id", req.razorpayPaymentId());
        options.put("razorpay_signature", req.razorpaySignature());

        boolean valid = Utils.verifyPaymentSignature(options, razorpayKeySecret);
        if (!valid) {
            throw new RuntimeException("Invalid payment signature");
        }

        AppUser user = userRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        PaymentRecord record = new PaymentRecord();
        record.setUser(user);
        record.setOrderId(req.razorpayOrderId());
        record.setPaymentId(req.razorpayPaymentId());
        record.setSignature(req.razorpaySignature());
        record.setPlanCode(req.planCode());
        record.setCurrency("INR");
        record.setAmount(req.planCode().equalsIgnoreCase("PREMIUM") ? 2499 : 999);
        record.setStatus("SUCCESS");
        paymentRecordRepository.save(record);

        subscriptionService.activateSubscription(
                user,
                req.planCode(),
                req.razorpayOrderId(),
                req.razorpayPaymentId(),
                record.getAmount(),
                record.getCurrency()
        );

        return Map.of("message", "Payment verified and subscription activated");
    }
}
