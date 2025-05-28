package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.Notification;
import com.brokendev.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}
