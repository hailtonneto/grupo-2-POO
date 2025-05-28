// ... imports
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Image, Dimensions, Modal
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.42;

const CardInterface = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([
    {
      id: 1,
      color: '#0EA5E9',
      name: 'VINÍCIUS SOUZA MACEDO',
      number: '...5931',
      active: true,
      type: 'mastercard',
    },
    {
      id: 2,
      color: '#5A7A8C',
      active: false,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const toggleCardActive = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].active = !updatedCards[index].active;
    setCards(updatedCards);
  };

  const confirmBlockCard = () => {
    const updatedCards = [...cards];
    updatedCards[activeIndex].active = false;
    setCards(updatedCards);
    setShowModal(false);
  };

  const renderCard = (card, index) => {
    if (card.active && card.name) {
      return (
        <View style={[styles.card, { backgroundColor: card.color }]}>
          <View style={styles.cardHeader}>
            <Image
              source={require("../assets/cards/settings.png")}
              style={styles.settingsIcon}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardName}>{card.name}</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardNumber}>{card.number}</Text>
            {card.type === 'mastercard' && (
              <View style={styles.cardLogoContainer}>
                <View style={styles.mastercardLogo}>
                  <View style={[styles.mastercardCircle, { backgroundColor: '#EB001B' }]} />
                  <View style={[styles.mastercardCircle, { backgroundColor: '#F79E1B', marginLeft: -10 }]} />
                </View>
              </View>
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.card, { backgroundColor: card.color }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.virtualLabel}>VIRTUAL</Text>
            <Image
              source={require("../assets/cards/qrcode.png")}
              style={styles.qrIcon}
            />
          </View>
          <View style={styles.activateCardContainer}>
            <TouchableOpacity
              style={styles.activateButton}
              onPress={() => toggleCardActive(index)}
            >
              <Text style={styles.activateButtonText}>Ativar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.statusDot} />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartões</Text>

      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => setActiveIndex(index)}
            style={styles.cardWrapper}
          >
            {renderCard(card, index)}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.blockButton} onPress={() => setShowModal(true)}>
        <Text style={styles.blockButtonText}>Bloquear</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent={true} visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Bloquear o cartão temporariamente?</Text>
            <Text style={styles.modalText}>
              Ele poderá ser desbloqueado a qualquer momento por aqui. As transações recorrentes serão cobradas mesmo com o bloqueio. Em caso de perda ou roubo, solicite o cancelamento do cartão no nosso atendimento.
            </Text>
            <TouchableOpacity style={styles.modalBlockButton} onPress={confirmBlockCard}>
              <Text style={styles.modalBlockButtonText}>Bloquear Cartão</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: '#0EA5E9',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    width: cardWidth,
    height: cardWidth * 1.5,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    marginLeft: 120,
    opacity: 0.7,
    tintColor: '#7DD3FC',
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: 'white',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'InterBold',
  },
  cardLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mastercardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mastercardCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  activateCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activateButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  activateButtonText: {
    color: '#FFFFFF',
    fontFamily: 'InterBold',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
  },
  blockButton: {
    borderWidth: 1,
    borderColor: '#0EA5E9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: cardWidth,
  },
  blockButtonText: {
    color: '#0EA5E9',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0EA5E9',
  },
  virtualLabel: {
    fontSize: 15,
    fontFamily: 'InterBold',
    color: '#0EA5E9',
  },
  qrIcon: {
    width: 20,
    height: 20,
    opacity: 0.7,
    tintColor: '#0EA5E9',
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    marginBottom: -590,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: '#0EA5E9',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#0EA5E9',
    marginBottom: 20,
  },
  modalBlockButton: {
    backgroundColor: '#0EA5E9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBlockButtonText: {
    color: '#fff',
    fontFamily: 'InterBold',
  },
  modalCancelButton: {
    borderColor: '#0EA5E9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#0EA5E9',
    fontFamily: 'InterBold',
  },
});

export default CardInterface;
