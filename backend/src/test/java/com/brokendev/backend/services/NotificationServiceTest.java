package com.brokendev.backend.services;

import com.brokendev.backend.domain.Notification;
import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.notification.NotificationResponseDTO;
import com.brokendev.backend.exception.NotificationAccessDeniedException;
import com.brokendev.backend.exception.NotificationNotFoundException;
import com.brokendev.backend.repositories.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationService notificationService;

    private User user;
    private Notification notification;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("user@email.com");

        notification = new Notification();
        notification.setId(100L);
        notification.setUser(user);
        notification.setTitle("Título");
        notification.setMessage("Mensagem");
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);
    }

    // notify - sucesso
    @Test
    void notify_givenValidUserAndMessage_whenCalled_thenSaveNotification() {
        when(notificationRepository.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

        notificationService.notify(user, "Título", "Mensagem");

        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    // listNotifications - sucesso
    @Test
    void listNotifications_givenUserWithNotifications_whenCalled_thenReturnList() {
        when(notificationRepository.findByUserOrderByCreatedAtDesc(user)).thenReturn(List.of(notification));

        List<NotificationResponseDTO> list = notificationService.listNotifications(user);

        assertThat(list).hasSize(1);
        assertThat(list.get(0).id()).isEqualTo(100L);
        assertThat(list.get(0).title()).isEqualTo("Título");
        assertThat(list.get(0).read()).isFalse();
    }

    // markAsRead - sucesso
    @Test
    void markAsRead_givenValidNotificationIdAndUser_whenOwnershipValid_thenMarkAsRead() {
        when(notificationRepository.findById(100L)).thenReturn(Optional.of(notification));
        when(notificationRepository.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

        notificationService.markAsRead(100L, user);

        assertThat(notification.isRead()).isTrue();
        verify(notificationRepository).save(notification);
    }

    // markAsRead - notificação não encontrada
    @Test
    void markAsRead_givenInvalidNotificationId_whenNotFound_thenThrowException() {
        when(notificationRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> notificationService.markAsRead(999L, user))
                .isInstanceOf(NotificationNotFoundException.class)
                .hasMessage("Notificação não encontrada");
    }

    // markAsRead - acesso negado
    @Test
    void markAsRead_givenNotificationOfOtherUser_whenOwnershipInvalid_thenThrowException() {
        User otherUser = new User();
        otherUser.setId(2L);
        notification.setUser(otherUser);

        when(notificationRepository.findById(100L)).thenReturn(Optional.of(notification));

        assertThatThrownBy(() -> notificationService.markAsRead(100L, user))
                .isInstanceOf(NotificationAccessDeniedException.class)
                .hasMessage("Acesso negado à notificação");
    }
}