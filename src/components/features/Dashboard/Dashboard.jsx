import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  TrendingUp,
  FileText,
  UserCheck,
  UserX,
  BarChart2
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const Dashboard = () => {
  const { students, universities, getDashboardStats } = useApp();
  const stats = getDashboardStats();

  const CircularProgress = ({ percentage, color = '#011ff3', size = 120 }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute text-[#011ff3] font-bold text-xl">
          {percentage}%
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, color, icon: Icon, trend }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}%
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-[#011ff3] text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#011ff3] mb-6">Dashboard Overview</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          color="bg-blue-500"
          icon={Users}
          trend={12}
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents.toLocaleString()}
          color="bg-green-500"
          icon={UserCheck}
          trend={8}
        />
        <StatCard
          title="Total Universities"
          value={stats.totalUniversities.toLocaleString()}
          color="bg-purple-500"
          icon={Building2}
          trend={15}
        />
        <StatCard
          title="Total Students in Universities"
          value={stats.totalStudentsInUniversities.toLocaleString()}
          color="bg-yellow-500"
          icon={GraduationCap}
          trend={10}
        />
      </div>

      {/* Analytics and Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Student Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-[#011ff3] mb-6">Student Distribution</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <CircularProgress 
                percentage={stats.totalUniversities > 0 ? Math.round((stats.activeStudents / stats.totalStudents) * 100) : 0} 
                color="#10B981" 
              />
              <p className="text-gray-900 font-semibold mt-2">Active Students</p>
              <p className="text-gray-500 text-sm">{stats.activeStudents} Students</p>
            </div>
            <div className="text-center">
              <CircularProgress 
                percentage={stats.totalUniversities > 0 ? Math.round((stats.totalStudentsInUniversities / (stats.totalUniversities * 1000)) * 100) : 0} 
                color="#F59E0B" 
              />
              <p className="text-gray-900 font-semibold mt-2">University Capacity</p>
              <p className="text-gray-500 text-sm">{stats.totalStudentsInUniversities} Students</p>
            </div>
            <div className="text-center">
              <CircularProgress 
                percentage={stats.totalUniversities > 0 ? Math.round((stats.averageStudentsPerUniversity / 1000) * 100) : 0} 
                color="#EF4444" 
              />
              <p className="text-gray-900 font-semibold mt-2">Average per University</p>
              <p className="text-gray-500 text-sm">{stats.averageStudentsPerUniversity} Students</p>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-[#011ff3] mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {students.slice(0, 4).map((student, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium">{`${student.first_name} ${student.last_name}`}</p>
                  <p className="text-gray-500 text-xs">{student.status}</p>
                </div>
                <div className="text-xs text-gray-500">{student.university}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* University Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-[#011ff3] mb-6">University Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.slice(0, 4).map((university) => (
            <div key={university.id} className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-900 font-semibold mb-2">{university.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Students</span>
                  <span className="text-gray-900">{university.number_of_students?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`${
                    university.status === 'active' ? 'text-green-600' :
                    university.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {university.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;