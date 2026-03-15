package com.tms.service.impl;

import com.tms.dto.RegisterRequest;
import com.tms.entity.User;
import com.tms.repository.UserRepository;
import com.tms.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String registerUser(RegisterRequest request) {

        try {

            User user = new User();

            user.setFirstName(request.getFirstName());
            user.setMiddleName(request.getMiddleName());
            user.setLastName(request.getLastName());
            user.setMobile(request.getMobile());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());

            // Save photo
            MultipartFile file = request.getPhoto();

            if(file != null && !file.isEmpty()) {

                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

                String uploadDir = System.getProperty("user.dir") + "/uploads/";

                File dir = new File(uploadDir);
                if(!dir.exists()) dir.mkdirs();

                file.transferTo(new File(uploadDir + fileName));

                user.setPhoto(fileName);
            }

            userRepository.save(user);

            return "User Registered Successfully";

        } catch(Exception e) {
            e.printStackTrace();
            return "Registration Failed";
        }
    }

    @Override
    public User login(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }

        return null;
    }
}