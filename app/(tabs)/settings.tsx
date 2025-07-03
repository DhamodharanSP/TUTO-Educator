import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Globe, Moon, CircleHelp as HelpCircle, MessageCircle, Star, Share2, LogOut, ChevronRight, Camera, CreditCard as Edit, X, Save, Award, BookOpen, Users, Briefcase, Shield, Download, Upload } from 'lucide-react-native';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'navigate' | 'toggle' | 'info';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

const SettingCard = ({ item }: { item: SettingItem }) => (
  <TouchableOpacity
    style={styles.settingCard}
    onPress={item.onPress}
    disabled={item.type === 'toggle'}
  >
    <View style={styles.settingIcon}>
      <item.icon size={24} color="#FF6B35" />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{item.title}</Text>
      {item.subtitle && (
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      )}
    </View>
    <View style={styles.settingAction}>
      {item.type === 'toggle' && (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#E5E7EB', true: '#FF6B35' }}
          thumbColor={item.value ? '#FFFFFF' : '#9CA3AF'}
        />
      )}
      {item.type === 'navigate' && (
        <ChevronRight size={20} color="#9CA3AF" />
      )}
    </View>
  </TouchableOpacity>
);

const AchievementBadge = ({ title, icon: Icon, earned }: { title: string; icon: any; earned: boolean }) => (
  <View style={[styles.achievementBadge, { opacity: earned ? 1 : 0.5 }]}>
    <View style={[styles.badgeIcon, { backgroundColor: earned ? '#FF6B35' : '#E5E7EB' }]}>
      <Icon size={20} color={earned ? '#FFFFFF' : '#9CA3AF'} />
    </View>
    <Text style={[styles.badgeTitle, { color: earned ? '#111827' : '#9CA3AF' }]}>
      {title}
    </Text>
  </View>
);

export default function Settings() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  // Profile form states
  const [name, setName] = useState('Priya Sharma');
  const [bio, setBio] = useState('Mathematics and Science Teacher • 8 years experience');
  const [subjects, setSubjects] = useState('Mathematics, Physics, Chemistry');
  const [experience, setExperience] = useState('8 years');
  
  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const profileStats = {
    totalStudents: 65,
    totalClasses: 8,
    monthlyEarnings: 28500,
    rating: 4.8
  };

  const achievements = [
    { title: 'Teacher Gem', icon: Award, earned: true },
    { title: 'Hundred Students', icon: Users, earned: true },
    { title: 'Annual Guru', icon: BookOpen, earned: true },
    { title: 'Tech Teacher', icon: Briefcase, earned: false },
  ];

  const languages = [
    { code: 'en', name: 'English', english: 'English' },
    { code: 'hi', name: 'हिंदी', english: 'Hindi' },
    { code: 'ta', name: 'தமிழ்', english: 'Tamil' },
    { code: 'te', name: 'తెలుగు', english: 'Telugu' },
    { code: 'kn', name: 'ಕನ್ನಡ', english: 'Kannada' },
    { code: 'mr', name: 'मराठी', english: 'Marathi' },
    { code: 'bn', name: 'বাংলা', english: 'Bengali' },
  ];

  const helpTopics = [
    { title: 'How to create a class?', content: 'To create a new class, press the + button on the home screen...' },
    { title: 'How to add students?', content: 'To add students, go to the Students tab and press the + button...' },
    { title: 'How to track payments?', content: 'Go to the Payments tab to view all payments...' },
    { title: 'How to share materials?', content: 'In the class, go to Materials section and upload files...' },
  ];

  const settingsData: SettingItem[] = [
    {
      id: 'profile',
      title: 'Edit Profile',
      subtitle: 'Update your information',
      icon: User,
      type: 'navigate',
      onPress: () => setShowProfileModal(true)
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Push notification settings',
      icon: Bell,
      type: 'toggle',
      value: notifications,
      onToggle: setNotifications
    },
    {
      id: 'language',
      title: 'Language',
      subtitle: `Current: ${selectedLanguage}`,
      icon: Globe,
      type: 'navigate',
      onPress: () => setShowLanguageModal(true)
    },
    {
      id: 'theme',
      title: 'Dark Mode',
      subtitle: 'Enable dark theme',
      icon: Moon,
      type: 'toggle',
      value: darkMode,
      onToggle: setDarkMode
    },
    {
      id: 'help',
      title: 'Help and FAQ',
      subtitle: 'Common questions answered',
      icon: HelpCircle,
      type: 'navigate',
      onPress: () => setShowHelpModal(true)
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      subtitle: 'Tell us how we can improve',
      icon: MessageCircle,
      type: 'navigate',
      onPress: () => Alert.alert('Feedback', 'Opening feedback form...')
    },
    {
      id: 'rate',
      title: 'Rate the App',
      subtitle: 'Rate us on Play Store',
      icon: Star,
      type: 'navigate',
      onPress: () => Alert.alert('Rating', 'Redirecting to Play Store...')
    },
    {
      id: 'share',
      title: 'Share App',
      subtitle: 'Share with friends',
      icon: Share2,
      type: 'navigate',
      onPress: () => Alert.alert('Share', 'Opening share menu...')
    }
  ];

  const renderProfileModal = () => (
    <Modal
      visible={showProfileModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={() => setShowProfileModal(false)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.profileForm}>
          <View style={styles.avatarSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.editAvatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell about yourself..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subjects Taught</Text>
            <TextInput
              style={styles.textInput}
              value={subjects}
              onChangeText={setSubjects}
              placeholder="Mathematics, Physics, Chemistry"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Teaching Experience</Text>
            <TextInput
              style={styles.textInput}
              value={experience}
              onChangeText={setExperience}
              placeholder="8 years"
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Save size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Choose Language</Text>
          <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.languageList}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                selectedLanguage === language.english && styles.selectedLanguage
              ]}
              onPress={() => {
                setSelectedLanguage(language.english);
                setShowLanguageModal(false);
                Alert.alert('Language Changed', `Language set to ${language.english}.`);
              }}
            >
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.languageEnglish}>{language.english}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderHelpModal = () => (
    <Modal
      visible={showHelpModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Help and FAQ</Text>
          <TouchableOpacity onPress={() => setShowHelpModal(false)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.helpContent}>
          {helpTopics.map((topic, index) => (
            <View key={index} style={styles.helpItem}>
              <Text style={styles.helpQuestion}>{topic.title}</Text>
              <Text style={styles.helpAnswer}>{topic.content}</Text>
            </View>
          ))}

          <View style={styles.supportSection}>
            <Text style={styles.supportTitle}>Need more help?</Text>
            <TouchableOpacity style={styles.supportButton}>
              <MessageCircle size={20} color="#FF6B35" />
              <Text style={styles.supportButtonText}>Contact Support Team</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
            style={styles.profileAvatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileBio}>{bio}</Text>
            <View style={styles.profileRating}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{profileStats.rating}</Text>
              <Text style={styles.ratingCount}>(142 ratings)</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowProfileModal(true)}
          >
            <Edit size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Users size={24} color="#FF6B35" />
            <Text style={styles.statNumber}>{profileStats.totalStudents}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statCard}>
            <BookOpen size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>{profileStats.totalClasses}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color="#10B981" />
            <Text style={styles.statNumber}>₹{profileStats.monthlyEarnings.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Monthly Income</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <AchievementBadge
                key={index}
                title={achievement.title}
                icon={achievement.icon}
                earned={achievement.earned}
              />
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            {settingsData.map((item) => (
              <SettingCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.dataButtons}>
            <TouchableOpacity style={styles.dataButton}>
              <Download size={20} color="#3B82F6" />
              <Text style={styles.dataButtonText}>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dataButton}>
              <Upload size={20} color="#10B981" />
              <Text style={styles.dataButtonText}>Create Backup</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.appVersion}>
          <Text style={styles.versionText}>Tuto v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for Indian Educators</Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderProfileModal()}
      {renderLanguageModal()}
      {renderHelpModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  profileRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  ratingCount: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF3E2',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementBadge: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingsList: {
    gap: 2,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  settingAction: {
    marginLeft: 12,
  },
  dataSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dataButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  dataButton: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dataButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'Inter-SemiBold',
  },
  appVersion: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
  },
  bottomSpacing: {
    height: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  profileForm: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  editAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#FF6B35',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  languageList: {
    flex: 1,
    padding: 20,
  },
  languageItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedLanguage: {
    borderWidth: 2,
    borderColor: '#FF6B35',
    backgroundColor: '#FEF3E2',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  languageEnglish: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  helpContent: {
    flex: 1,
    padding: 20,
  },
  helpItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  helpAnswer: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  supportSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#FEF3E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  supportButtonText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});