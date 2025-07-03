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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, Calendar, MapPin, Video, FileText, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Upload, Link, X, BookOpen, GraduationCap } from 'lucide-react-native';

interface Classroom {
  id: string;
  name: string;
  subject: string;
  students: number;
  mode: 'Online' | 'Offline' | 'Hybrid';
  timing: string;
  nextClass: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  image: string;
  location?: string;
  meetingLink?: string;
}

interface Material {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Link' | 'Audio';
  uploadDate: string;
  size?: string;
}

const ClassCard = ({ classroom, onPress }: { classroom: Classroom; onPress: () => void }) => (
  <TouchableOpacity style={styles.classCard} onPress={onPress}>
    <View style={styles.classHeader}>
      <Image source={{ uri: classroom.image }} style={styles.classImage} />
      <View style={styles.classInfo}>
        <Text style={styles.className}>{classroom.name}</Text>
        <Text style={styles.classSubject}>{classroom.subject}</Text>
        <View style={styles.classStats}>
          <View style={styles.statItem}>
            <Users size={16} color="#6B7280" />
            <Text style={styles.statText}>{classroom.students} students</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.statText}>{classroom.timing}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(classroom.status) }]}>
        <Text style={styles.statusText}>{classroom.status}</Text>
      </View>
    </View>
    <View style={styles.classFooter}>
      <View style={styles.modeIndicator}>
        <View style={[styles.modeBadge, { backgroundColor: getModeColor(classroom.mode) }]}>
          <Text style={styles.modeText}>{classroom.mode}</Text>
        </View>
        {classroom.mode === 'Online' && (
          <Video size={16} color="#8B5CF6" />
        )}
        {classroom.mode === 'Offline' && (
          <MapPin size={16} color="#10B981" />
        )}
      </View>
      <Text style={styles.nextClass}>Next class: {classroom.nextClass}</Text>
    </View>
  </TouchableOpacity>
);

const MaterialCard = ({ material }: { material: Material }) => (
  <View style={styles.materialCard}>
    <View style={styles.materialHeader}>
      <View style={styles.materialIcon}>
        {material.type === 'PDF' && <FileText size={20} color="#EF4444" />}
        {material.type === 'Video' && <Video size={20} color="#8B5CF6" />}
        {material.type === 'Link' && <Link size={20} color="#3B82F6" />}
        {material.type === 'Audio' && <BookOpen size={20} color="#F59E0B" />}
      </View>
      <View style={styles.materialInfo}>
        <Text style={styles.materialTitle}>{material.title}</Text>
        <Text style={styles.materialMeta}>{material.uploadDate} • {material.size}</Text>
      </View>
    </View>
  </View>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return '#10B981';
    case 'Upcoming': return '#F59E0B';
    case 'Completed': return '#6B7280';
    default: return '#6B7280';
  }
};

const getModeColor = (mode: string) => {
  switch (mode) {
    case 'Online': return '#8B5CF6';
    case 'Offline': return '#10B981';
    case 'Hybrid': return '#F59E0B';
    default: return '#6B7280';
  }
};

export default function Classrooms() {
  const [selectedClass, setSelectedClass] = useState<Classroom | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('stream');
  const [newClassName, setNewClassName] = useState('');
  const [newSubject, setNewSubject] = useState('');

  const classrooms: Classroom[] = [
    {
      id: '1',
      name: 'Class 10 Mathematics',
      subject: 'Mathematics • Grade 10',
      students: 25,
      mode: 'Hybrid',
      timing: '2:00 PM',
      nextClass: 'Today 2:00 PM',
      status: 'Active',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      location: 'Sharma Tuition Center, Main Market',
      meetingLink: 'meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      name: 'Physics Mastery',
      subject: 'Physics • Grade 11-12',
      students: 18,
      mode: 'Online',
      timing: '4:30 PM',
      nextClass: 'Tomorrow 4:30 PM',
      status: 'Upcoming',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      meetingLink: 'zoom.us/j/123456789'
    },
    {
      id: '3',
      name: 'Chemistry Lab',
      subject: 'Chemistry • Grade 12',
      students: 22,
      mode: 'Offline',
      timing: '6:00 PM',
      nextClass: 'Tomorrow 6:00 PM',
      status: 'Active',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      location: 'Science Laboratory, School Campus'
    }
  ];

  const materials: Material[] = [
    {
      id: '1',
      title: 'Quadratic Equations - Practice Problems',
      type: 'PDF',
      uploadDate: '2 days ago',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Algebra Basics Video Lecture',
      type: 'Video',
      uploadDate: '1 week ago',
      size: '45 min'
    },
    {
      id: '3',
      title: 'Khan Academy - Trigonometry',
      type: 'Link',
      uploadDate: '3 days ago',
      size: 'External'
    }
  ];

  const handleCreateClass = () => {
    if (newClassName && newSubject) {
      Alert.alert('Success!', `New class "${newClassName}" has been created.`);
      setShowCreateModal(false);
      setNewClassName('');
      setNewSubject('');
    }
  };

  const renderClassDetails = () => (
    <Modal
      visible={!!selectedClass}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedClass?.name}</Text>
          <TouchableOpacity onPress={() => setSelectedClass(null)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stream' && styles.activeTab]}
            onPress={() => setActiveTab('stream')}
          >
            <Text style={[styles.tabText, activeTab === 'stream' && styles.activeTabText]}>
              Class Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'materials' && styles.activeTab]}
            onPress={() => setActiveTab('materials')}
          >
            <Text style={[styles.tabText, activeTab === 'materials' && styles.activeTabText]}>
              Materials
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
            onPress={() => setActiveTab('attendance')}
          >
            <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText]}>
              Attendance
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.tabContent}>
          {activeTab === 'stream' && (
            <View style={styles.streamContent}>
              <TouchableOpacity style={styles.postButton}>
                <Plus size={20} color="#FF6B35" />
                <Text style={styles.postButtonText}>Create New Post</Text>
              </TouchableOpacity>

              <View style={styles.classInfoCard}>
                <Text style={styles.classInfoTitle}>Class Details</Text>
                <View style={styles.infoRow}>
                  <Users size={20} color="#6B7280" />
                  <Text style={styles.infoText}>{selectedClass?.students} students enrolled</Text>
                </View>
                <View style={styles.infoRow}>
                  <Clock size={20} color="#6B7280" />
                  <Text style={styles.infoText}>Time: {selectedClass?.timing}</Text>
                </View>
                {selectedClass?.location && (
                  <View style={styles.infoRow}>
                    <MapPin size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{selectedClass.location}</Text>
                  </View>
                )}
                {selectedClass?.meetingLink && (
                  <View style={styles.infoRow}>
                    <Video size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{selectedClass.meetingLink}</Text>
                  </View>
                )}
              </View>

              <View style={styles.announcementCard}>
                <Text style={styles.announcementTitle}>📢 Important Notice</Text>
                <Text style={styles.announcementText}>
                  Tomorrow's test will be on quadratic equations. All students should solve practice problems.
                </Text>
                <Text style={styles.announcementTime}>2 hours ago</Text>
              </View>
            </View>
          )}

          {activeTab === 'materials' && (
            <View style={styles.materialsContent}>
              <TouchableOpacity style={styles.uploadButton}>
                <Upload size={20} color="#FF6B35" />
                <Text style={styles.uploadButtonText}>Upload New Material</Text>
              </TouchableOpacity>

              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </View>
          )}

          {activeTab === 'attendance' && (
            <View style={styles.attendanceContent}>
              <View style={styles.attendanceHeader}>
                <Text style={styles.attendanceTitle}>Today's Attendance</Text>
                <Text style={styles.attendanceDate}>November 28, 2024</Text>
              </View>

              <View style={styles.attendanceStats}>
                <View style={styles.attendanceStat}>
                  <CheckCircle size={24} color="#10B981" />
                  <Text style={styles.attendanceStatNumber}>22</Text>
                  <Text style={styles.attendanceStatLabel}>Present</Text>
                </View>
                <View style={styles.attendanceStat}>
                  <AlertCircle size={24} color="#EF4444" />
                  <Text style={styles.attendanceStatNumber}>3</Text>
                  <Text style={styles.attendanceStatLabel}>Absent</Text>
                </View>
              </View>

              <View style={styles.studentList}>
                {['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sunita Devi', 'Vikas Gupta'].map((student, index) => (
                  <View key={index} style={styles.studentItem}>
                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{student}</Text>
                      <Text style={styles.studentClass}>Grade 10</Text>
                    </View>
                    <View style={styles.attendanceButtons}>
                      <TouchableOpacity style={styles.presentButton}>
                        <CheckCircle size={20} color="#10B981" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.absentButton}>
                        <AlertCircle size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderCreateModal = () => (
    <Modal
      visible={showCreateModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Create New Class</Text>
          <TouchableOpacity onPress={() => setShowCreateModal(false)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.createForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Class Name</Text>
            <TextInput
              style={styles.textInput}
              value={newClassName}
              onChangeText={setNewClassName}
              placeholder="e.g., Class 10 Mathematics"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject</Text>
            <TextInput
              style={styles.textInput}
              value={newSubject}
              onChangeText={setNewSubject}
              placeholder="e.g., Mathematics, Physics, Chemistry"
            />
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateClass}>
            <GraduationCap size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create Class</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Classes</Text>
        <TouchableOpacity
          style={styles.createClassButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>Active Classes</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>65</Text>
            <Text style={styles.summaryLabel}>Total Students</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Today's Classes</Text>
          </View>
        </View>

        <View style={styles.classroomsList}>
          {classrooms.map((classroom) => (
            <ClassCard
              key={classroom.id}
              classroom={classroom}
              onPress={() => setSelectedClass(classroom)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderClassDetails()}
      {renderCreateModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  createClassButton: {
    backgroundColor: '#FF6B35',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    fontFamily: 'Inter-Bold',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  classroomsList: {
    gap: 16,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  classImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  classStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  nextClass: {
    fontSize: 12,
    color: '#374151',
    fontFamily: 'Inter-Medium',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  streamContent: {
    gap: 16,
  },
  postButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    gap: 8,
  },
  postButtonText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  classInfoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  classInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  announcementCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  announcementText: {
    fontSize: 14,
    color: '#78350F',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 8,
  },
  announcementTime: {
    fontSize: 12,
    color: '#A16207',
    fontFamily: 'Inter-Regular',
  },
  materialsContent: {
    gap: 16,
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  materialCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  materialIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  materialMeta: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  attendanceContent: {
    gap: 16,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  attendanceDate: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  attendanceStats: {
    flexDirection: 'row',
    gap: 16,
  },
  attendanceStat: {
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
  attendanceStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  attendanceStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  studentList: {
    gap: 12,
  },
  studentItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  studentClass: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  presentButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
  },
  absentButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  createForm: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
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
  createButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});