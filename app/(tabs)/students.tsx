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
import { Plus, Search, Phone, Mail, MapPin, Calendar, TrendingUp, TrendingDown, CircleCheck as CheckCircle, Circle as XCircle, User, BookOpen, Clock, X, UserPlus } from 'lucide-react-native';

interface Student {
  id: string;
  name: string;
  class: string;
  parentName: string;
  phone: string;
  email?: string;
  address: string;
  enrollmentDate: string;
  totalClasses: number;
  attendedClasses: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  lastPayment: string;
  avatar: string;
  performance: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  subjects: string[];
}

const StudentCard = ({ student, onPress }: { student: Student; onPress: () => void }) => {
  const attendanceRate = Math.round((student.attendedClasses / student.totalClasses) * 100);
  
  return (
    <TouchableOpacity style={styles.studentCard} onPress={onPress}>
      <View style={styles.studentHeader}>
        <Image source={{ uri: student.avatar }} style={styles.avatar} />
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentClass}>{student.class}</Text>
          <Text style={styles.parentName}>Parent: {student.parentName}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.paymentStatus, { backgroundColor: getPaymentStatusColor(student.paymentStatus) }]}>
            <Text style={styles.paymentStatusText}>{student.paymentStatus}</Text>
          </View>
          <View style={styles.attendanceRate}>
            <Text style={styles.attendanceText}>{attendanceRate}%</Text>
            {attendanceRate >= 80 ? (
              <TrendingUp size={16} color="#10B981" />
            ) : (
              <TrendingDown size={16} color="#EF4444" />
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.studentStats}>
        <View style={styles.statItem}>
          <BookOpen size={16} color="#6B7280" />
          <Text style={styles.statText}>{student.subjects.length} subjects</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.statText}>{student.attendedClasses}/{student.totalClasses} classes</Text>
        </View>
        <View style={styles.statItem}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.statText}>Enrolled: {student.enrollmentDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Paid': return '#10B981';
    case 'Pending': return '#F59E0B';
    case 'Overdue': return '#EF4444';
    default: return '#6B7280';
  }
};

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case 'Excellent': return '#10B981';
    case 'Good': return '#3B82F6';
    case 'Average': return '#F59E0B';
    case 'Needs Improvement': return '#EF4444';
    default: return '#6B7280';
  }
};

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [newStudentName, setNewStudentName] = useState('');
  const [newParentName, setNewParentName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const students: Student[] = [
    {
      id: '1',
      name: 'Rahul Sharma',
      class: 'Grade 10 - Mathematics',
      parentName: 'Suresh Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@email.com',
      address: 'Main Market, Sector 15, Gurgaon',
      enrollmentDate: 'Jan 15, 2024',
      totalClasses: 45,
      attendedClasses: 42,
      paymentStatus: 'Paid',
      lastPayment: 'Nov 1, 2024',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      performance: 'Excellent',
      subjects: ['Mathematics', 'Physics']
    },
    {
      id: '2',
      name: 'Priya Patel',
      class: 'Grade 12 - Chemistry',
      parentName: 'Ramesh Patel',
      phone: '+91 87654 32109',
      address: 'Nehru Nagar, Block A, Delhi',
      enrollmentDate: 'Feb 20, 2024',
      totalClasses: 38,
      attendedClasses: 35,
      paymentStatus: 'Pending',
      lastPayment: 'Oct 15, 2024',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      performance: 'Good',
      subjects: ['Chemistry', 'Biology']
    },
    {
      id: '3',
      name: 'Amit Kumar',
      class: 'Grade 11 - Physics',
      parentName: 'Vinod Kumar',
      phone: '+91 76543 21098',
      address: 'Gandhi Nagar, Sector 8, Noida',
      enrollmentDate: 'Mar 5, 2024',
      totalClasses: 40,
      attendedClasses: 28,
      paymentStatus: 'Overdue',
      lastPayment: 'Sep 10, 2024',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      performance: 'Average',
      subjects: ['Physics', 'Mathematics']
    },
    {
      id: '4',
      name: 'Sunita Devi',
      class: 'Grade 10 - Mathematics',
      parentName: 'Rajesh Devi',
      phone: '+91 65432 10987',
      address: 'Laxmi Nagar, Delhi',
      enrollmentDate: 'Apr 12, 2024',
      totalClasses: 35,
      attendedClasses: 33,
      paymentStatus: 'Paid',
      lastPayment: 'Nov 5, 2024',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      performance: 'Good',
      subjects: ['Mathematics']
    },
    {
      id: '5',
      name: 'Vikas Gupta',
      class: 'Grade 12 - Chemistry',
      parentName: 'Ashok Gupta',
      phone: '+91 54321 09876',
      address: 'Vasant Kunj, New Delhi',
      enrollmentDate: 'May 8, 2024',
      totalClasses: 32,
      attendedClasses: 30,
      paymentStatus: 'Paid',
      lastPayment: 'Oct 28, 2024',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      performance: 'Excellent',
      subjects: ['Chemistry', 'Mathematics']
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'All' || student.class.includes(filterClass);
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    if (newStudentName && newParentName && newPhone) {
      Alert.alert('Success!', `New student "${newStudentName}" has been added.`);
      setShowAddModal(false);
      setNewStudentName('');
      setNewParentName('');
      setNewPhone('');
    }
  };

  const renderStudentDetails = () => (
    <Modal
      visible={!!selectedStudent}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedStudent?.name}</Text>
          <TouchableOpacity onPress={() => setSelectedStudent(null)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.studentProfile}>
            <Image source={{ uri: selectedStudent?.avatar }} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{selectedStudent?.name}</Text>
              <Text style={styles.profileClass}>{selectedStudent?.class}</Text>
              <View style={[styles.performanceBadge, { backgroundColor: getPerformanceColor(selectedStudent?.performance || '') }]}>
                <Text style={styles.performanceBadgeText}>
                  Performance: {selectedStudent?.performance}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.contactItem}>
              <User size={20} color="#6B7280" />
              <Text style={styles.contactText}>Parent: {selectedStudent?.parentName}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={20} color="#6B7280" />
              <Text style={styles.contactText}>{selectedStudent?.phone}</Text>
            </View>
            {selectedStudent?.email && (
              <View style={styles.contactItem}>
                <Mail size={20} color="#6B7280" />
                <Text style={styles.contactText}>{selectedStudent.email}</Text>
              </View>
            )}
            <View style={styles.contactItem}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.contactText}>{selectedStudent?.address}</Text>
            </View>
          </View>

          <View style={styles.academicSection}>
            <Text style={styles.sectionTitle}>Academic Information</Text>
            <View style={styles.academicStats}>
              <View style={styles.academicStat}>
                <Text style={styles.academicStatNumber}>{selectedStudent?.attendedClasses}</Text>
                <Text style={styles.academicStatLabel}>Classes Attended</Text>
              </View>
              <View style={styles.academicStat}>
                <Text style={styles.academicStatNumber}>{selectedStudent?.totalClasses}</Text>
                <Text style={styles.academicStatLabel}>Total Classes</Text>
              </View>
              <View style={styles.academicStat}>
                <Text style={styles.academicStatNumber}>
                  {selectedStudent ? Math.round((selectedStudent.attendedClasses / selectedStudent.totalClasses) * 100) : 0}%
                </Text>
                <Text style={styles.academicStatLabel}>Attendance Rate</Text>
              </View>
            </View>
            
            <View style={styles.subjectsSection}>
              <Text style={styles.subSectionTitle}>Enrolled Subjects</Text>
              <View style={styles.subjectsList}>
                {selectedStudent?.subjects.map((subject, index) => (
                  <View key={index} style={styles.subjectTag}>
                    <Text style={styles.subjectTagText}>{subject}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <View style={styles.paymentInfo}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Current Status:</Text>
                <View style={[styles.paymentStatusBadge, { backgroundColor: getPaymentStatusColor(selectedStudent?.paymentStatus || '') }]}>
                  <Text style={styles.paymentStatusBadgeText}>
                    {selectedStudent?.paymentStatus}
                  </Text>
                </View>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Last Payment:</Text>
                <Text style={styles.paymentValue}>{selectedStudent?.lastPayment}</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Enrollment Date:</Text>
                <Text style={styles.paymentValue}>{selectedStudent?.enrollmentDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <Mail size={20} color="#FF6B35" />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderAddStudentModal = () => (
    <Modal
      visible={showAddModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add New Student</Text>
          <TouchableOpacity onPress={() => setShowAddModal(false)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.addForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Student Name</Text>
            <TextInput
              style={styles.textInput}
              value={newStudentName}
              onChangeText={setNewStudentName}
              placeholder="Student's full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Parent Name</Text>
            <TextInput
              style={styles.textInput}
              value={newParentName}
              onChangeText={setNewParentName}
              placeholder="Parent's full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={newPhone}
              onChangeText={setNewPhone}
              placeholder="+91 XXXXX XXXXX"
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
            <UserPlus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Student</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Students</Text>
        <TouchableOpacity
          style={styles.addStudentButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search student or parent name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {['All', 'Grade 10', 'Grade 11', 'Grade 12'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, filterClass === filter && styles.activeFilter]}
              onPress={() => setFilterClass(filter)}
            >
              <Text style={[styles.filterText, filterClass === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{students.length}</Text>
          <Text style={styles.summaryLabel}>Total Students</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{students.filter(s => s.paymentStatus === 'Paid').length}</Text>
          <Text style={styles.summaryLabel}>Paid</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{students.filter(s => s.paymentStatus === 'Pending').length}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{students.filter(s => s.paymentStatus === 'Overdue').length}</Text>
          <Text style={styles.summaryLabel}>Overdue</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.studentsList}>
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onPress={() => setSelectedStudent(student)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderStudentDetails()}
      {renderAddStudentModal()}
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
  addStudentButton: {
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
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  summary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    fontFamily: 'Inter-Bold',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  studentsList: {
    gap: 12,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  parentName: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  statusContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  paymentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentStatusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  attendanceRate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#6B7280',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  studentProfile: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
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
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  profileClass: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  performanceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  performanceBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  academicSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  academicStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  academicStat: {
    alignItems: 'center',
  },
  academicStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    fontFamily: 'Inter-Bold',
  },
  academicStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 4,
  },
  subjectsSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  subjectsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectTag: {
    backgroundColor: '#FEF3E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subjectTagText: {
    fontSize: 12,
    color: '#EA580C',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  paymentSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentInfo: {
    gap: 12,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  paymentValue: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  paymentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentStatusBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButtonText: {
    color: '#FF6B35',
  },
  addForm: {
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
  addButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});