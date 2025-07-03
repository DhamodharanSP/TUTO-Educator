import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, IndianRupee, Calendar, Users, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Clock, Download, Filter, Search, X, Send, CreditCard, Wallet, TrendingUp, FileText } from 'lucide-react-native';

interface PaymentRequest {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  studentsCount: number;
  paidCount: number;
  status: 'Active' | 'Completed' | 'Overdue';
  description: string;
  createdDate: string;
}

interface Payment {
  id: string;
  studentName: string;
  amount: number;
  requestTitle: string;
  paymentDate: string;
  status: 'Paid' | 'Pending' | 'Failed';
  method: 'UPI' | 'Cash' | 'Bank Transfer';
}

const PaymentRequestCard = ({ request, onPress }: { request: PaymentRequest; onPress: () => void }) => (
  <TouchableOpacity style={styles.requestCard} onPress={onPress}>
    <View style={styles.requestHeader}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestTitle}>{request.title}</Text>
        <Text style={styles.requestAmount}>₹{request.amount.toLocaleString()}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
        <Text style={styles.statusText}>{request.status}</Text>
      </View>
    </View>
    
    <View style={styles.requestStats}>
      <View style={styles.statItem}>
        <Users size={16} color="#6B7280" />
        <Text style={styles.statText}>{request.studentsCount} students</Text>
      </View>
      <View style={styles.statItem}>
        <CheckCircle size={16} color="#10B981" />
        <Text style={styles.statText}>{request.paidCount} paid</Text>
      </View>
      <View style={styles.statItem}>
        <Calendar size={16} color="#6B7280" />
        <Text style={styles.statText}>Due: {request.dueDate}</Text>
      </View>
    </View>
    
    <View style={styles.progressBar}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${(request.paidCount / request.studentsCount) * 100}%` }
        ]} 
      />
    </View>
    <Text style={styles.progressText}>
      {Math.round((request.paidCount / request.studentsCount) * 100)}% complete
    </Text>
  </TouchableOpacity>
);

const PaymentCard = ({ payment }: { payment: Payment }) => (
  <View style={styles.paymentCard}>
    <View style={styles.paymentHeader}>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentStudent}>{payment.studentName}</Text>
        <Text style={styles.paymentTitle}>{payment.requestTitle}</Text>
        <Text style={styles.paymentDate}>{payment.paymentDate}</Text>
      </View>
      <View style={styles.paymentAmount}>
        <Text style={styles.paymentAmountText}>₹{payment.amount.toLocaleString()}</Text>
        <View style={[styles.paymentStatusBadge, { backgroundColor: getPaymentStatusColor(payment.status) }]}>
          <Text style={styles.paymentStatusText}>{payment.status}</Text>
        </View>
      </View>
    </View>
    
    <View style={styles.paymentFooter}>
      <View style={styles.paymentMethod}>
        {payment.method === 'UPI' && <Wallet size={16} color="#8B5CF6" />}
        {payment.method === 'Cash' && <IndianRupee size={16} color="#10B981" />}
        {payment.method === 'Bank Transfer' && <CreditCard size={16} color="#3B82F6" />}
        <Text style={styles.paymentMethodText}>{payment.method}</Text>
      </View>
    </View>
  </View>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return '#3B82F6';
    case 'Completed': return '#10B981';
    case 'Overdue': return '#EF4444';
    default: return '#6B7280';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Paid': return '#10B981';
    case 'Pending': return '#F59E0B';
    case 'Failed': return '#EF4444';
    default: return '#6B7280';
  }
};

export default function Payments() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Create payment form states
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [sendToAll, setSendToAll] = useState(true);

  const paymentRequests: PaymentRequest[] = [
    {
      id: '1',
      title: 'November 2024 - Math Fees',
      amount: 2500,
      dueDate: 'Nov 30, 2024',
      studentsCount: 25,
      paidCount: 18,
      status: 'Active',
      description: 'Monthly fees for Grade 10 Mathematics',
      createdDate: 'Nov 1, 2024'
    },
    {
      id: '2',
      title: 'Physics Special Class Fees',
      amount: 1500,
      dueDate: 'Nov 25, 2024',
      studentsCount: 18,
      paidCount: 15,
      status: 'Active',
      description: 'Special class for exam preparation',
      createdDate: 'Nov 15, 2024'
    },
    {
      id: '3',
      title: 'October 2024 - Chemistry Fees',
      amount: 2000,
      dueDate: 'Oct 31, 2024',
      studentsCount: 22,
      paidCount: 22,
      status: 'Completed',
      description: 'Monthly fees for Grade 12 Chemistry',
      createdDate: 'Oct 1, 2024'
    },
    {
      id: '4',
      title: 'September 2024 - Math Fees',
      amount: 2500,
      dueDate: 'Sep 30, 2024',
      studentsCount: 25,
      paidCount: 20,
      status: 'Overdue',
      description: 'Monthly fees for Grade 10 Mathematics',
      createdDate: 'Sep 1, 2024'
    }
  ];

  const recentPayments: Payment[] = [
    {
      id: '1',
      studentName: 'Rahul Sharma',
      amount: 2500,
      requestTitle: 'November 2024 - Math Fees',
      paymentDate: 'Nov 28, 2024',
      status: 'Paid',
      method: 'UPI'
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      amount: 1500,
      requestTitle: 'Physics Special Class Fees',
      paymentDate: 'Nov 27, 2024',
      status: 'Paid',
      method: 'Cash'
    },
    {
      id: '3',
      studentName: 'Amit Kumar',
      amount: 2000,
      requestTitle: 'October 2024 - Chemistry Fees',
      paymentDate: 'Nov 26, 2024',
      status: 'Paid',
      method: 'Bank Transfer'
    },
    {
      id: '4',
      studentName: 'Sunita Devi',
      amount: 2500,
      requestTitle: 'November 2024 - Math Fees',
      paymentDate: 'Nov 25, 2024',
      status: 'Pending',
      method: 'UPI'
    }
  ];

  const totalMonthlyRevenue = paymentRequests.reduce((sum, req) => sum + (req.amount * req.paidCount), 0);
  const pendingAmount = paymentRequests.reduce((sum, req) => sum + (req.amount * (req.studentsCount - req.paidCount)), 0);

  const handleCreateRequest = () => {
    if (newTitle && newAmount && newDueDate) {
      Alert.alert('Success!', `New payment request "${newTitle}" has been created.`);
      setShowCreateModal(false);
      setNewTitle('');
      setNewAmount('');
      setNewDueDate('');
      setNewDescription('');
    }
  };

  const renderRequestDetails = () => (
    <Modal
      visible={!!selectedRequest}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedRequest?.title}</Text>
          <TouchableOpacity onPress={() => setSelectedRequest(null)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.requestDetailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detailValue}>₹{selectedRequest?.amount.toLocaleString()}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Due Date:</Text>
              <Text style={styles.detailValue}>{selectedRequest?.dueDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Students:</Text>
              <Text style={styles.detailValue}>{selectedRequest?.studentsCount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Paid:</Text>
              <Text style={styles.detailValue}>{selectedRequest?.paidCount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pending:</Text>
              <Text style={styles.detailValue}>{selectedRequest ? selectedRequest.studentsCount - selectedRequest.paidCount : 0}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Send Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <Download size={20} color="#FF6B35" />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Download Report</Text>
            </TouchableOpacity>
          </View>
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
          <Text style={styles.modalTitle}>New Payment Request</Text>
          <TouchableOpacity onPress={() => setShowCreateModal(false)}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.createForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.textInput}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="e.g., November 2024 - Math Fees"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Amount (₹)</Text>
            <TextInput
              style={styles.textInput}
              value={newAmount}
              onChangeText={setNewAmount}
              placeholder="2500"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Due Date</Text>
            <TextInput
              style={styles.textInput}
              value={newDueDate}
              onChangeText={setNewDueDate}
              placeholder="Nov 30, 2024"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Payment description..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.switchGroup}>
            <Text style={styles.switchLabel}>Send to all students</Text>
            <Switch
              value={sendToAll}
              onValueChange={setSendToAll}
              trackColor={{ false: '#E5E7EB', true: '#FF6B35' }}
              thumbColor={sendToAll ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateRequest}>
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Send Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const filteredRequests = paymentRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = recentPayments.filter(payment => 
    payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.requestTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Management</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <TrendingUp size={24} color="#10B981" />
          </View>
          <Text style={styles.summaryAmount}>₹{totalMonthlyRevenue.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>This Month's Revenue</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Clock size={24} color="#F59E0B" />
          </View>
          <Text style={styles.summaryAmount}>₹{pendingAmount.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Pending Payments</Text>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Payment Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Payment History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'requests' && (
          <View style={styles.requestsList}>
            <View style={styles.filterSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                {['All', 'Active', 'Completed', 'Overdue'].map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[styles.filterButton, filterStatus === filter && styles.activeFilter]}
                    onPress={() => setFilterStatus(filter)}
                  >
                    <Text style={[styles.filterText, filterStatus === filter && styles.activeFilterText]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {filteredRequests.map((request) => (
              <PaymentRequestCard
                key={request.id}
                request={request}
                onPress={() => setSelectedRequest(request)}
              />
            ))}
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.paymentsList}>
            {filteredPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderRequestDetails()}
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
  createButton: {
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
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 16,
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
  requestsList: {
    gap: 12,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: 12,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  requestAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
    fontFamily: 'Inter-Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  requestStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#374151',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  paymentsList: {
    gap: 12,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentStudent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  paymentTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  paymentDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  paymentAmountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  paymentStatusBadge: {
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
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paymentMethodText: {
    fontSize: 12,
    color: '#6B7280',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  requestDetailsCard: {
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
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
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButtonText: {
    color: '#FF6B35',
  },
  createForm: {
    flex: 1,
    padding: 20,
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
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  createButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});