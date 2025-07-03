import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Plus, 
  MessageSquare, 
  IndianRupee, 
  Users, 
  Calendar,
  Bell,
  TrendingUp,
  BookOpen
} from 'lucide-react-native';

const QuickActionCard = ({ icon: Icon, title, subtitle, onPress, color = '#FF6B35' }) => (
  <TouchableOpacity style={[styles.quickActionCard, { borderLeftColor: color }]} onPress={onPress}>
    <View style={styles.quickActionIcon}>
      <Icon size={24} color={color} />
    </View>
    <View style={styles.quickActionContent}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const StatCard = ({ icon: Icon, value, label, trend, color = '#FF6B35' }) => (
  <View style={[styles.statCard, { borderTopColor: color }]}>
    <View style={styles.statHeader}>
      <Icon size={24} color={color} />
      {trend && (
        <View style={styles.trendIndicator}>
          <TrendingUp size={16} color="#10B981" />
          <Text style={styles.trendText}>+{trend}%</Text>
        </View>
      )}
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const UpcomingClass = ({ title, time, students, type }) => (
  <View style={styles.upcomingClass}>
    <View style={styles.classTime}>
      <Text style={styles.classTimeText}>{time}</Text>
      <View style={[styles.classTypeBadge, { backgroundColor: type === 'Live' ? '#EF4444' : '#F59E0B' }]}>
        <Text style={styles.classTypeBadgeText}>{type}</Text>
      </View>
    </View>
    <Text style={styles.classTitle}>{title}</Text>
    <Text style={styles.classStudents}>{students} students enrolled</Text>
  </View>
);

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome! 👋</Text>
              <Text style={styles.nameText}>Priya Sharma</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <Text style={styles.sectionTitle}>Your Teaching Impact</Text>
        <View style={styles.statsContainer}>
          <StatCard
            icon={Users}
            value="142"
            label="Active Students"
            trend="12"
            color="#FF6B35"
          />
          <StatCard
            icon={BookOpen}
            value="8"
            label="Active Classes"
            trend="25"
            color="#8B5CF6"
          />
          <StatCard
            icon={IndianRupee}
            value="₹28,500"
            label="This Month"
            trend="18"
            color="#10B981"
          />
          <StatCard
            icon={Calendar}
            value="6"
            label="Classes Today"
            color="#F59E0B"
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <QuickActionCard
            icon={Plus}
            title="Create New Class"
            subtitle="Set up a new subject or batch"
            color="#FF6B35"
          />
          <QuickActionCard
            icon={MessageSquare}
            title="Post Update"
            subtitle="Share announcement with students"
            color="#8B5CF6"
          />
          <QuickActionCard
            icon={IndianRupee}
            title="Request Payment"
            subtitle="Send fee reminder to students"
            color="#10B981"
          />
        </View>

        {/* Upcoming Classes */}
        <Text style={styles.sectionTitle}>Today's Classes</Text>
        <View style={styles.upcomingClasses}>
          <UpcomingClass
            title="Class 10 Mathematics"
            time="2:00 PM"
            students={25}
            type="Live"
          />
          <UpcomingClass
            title="Physics Doubt Session"
            time="4:30 PM"
            students={18}
            type="In 30 min"
          />
          <UpcomingClass
            title="Chemistry Revision"
            time="6:00 PM"
            students={22}
            type="Upcoming"
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingBottom: 24,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    color: '#10B981',
    marginLeft: 2,
    fontFamily: 'Inter-Medium',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionIcon: {
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  upcomingClasses: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  upcomingClass: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  classTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
  },
  classTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  classTypeBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  classTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  classStudents: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  bottomSpacing: {
    height: 20,
  },
});