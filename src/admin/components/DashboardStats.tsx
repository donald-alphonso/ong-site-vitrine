interface StatsProps {
  stats: {
    totalContacts: number;
    pendingContacts: number;
    contactedCount: number;
    resolvedCount: number;
  };
}

export function DashboardStats({ stats }: StatsProps) {
  const statCards = [
    {
      title: 'Total des Contacts',
      value: stats.totalContacts,
      color: 'bg-blue-500',
      icon: '📊',
    },
    {
      title: 'En Attente',
      value: stats.pendingContacts,
      color: 'bg-yellow-500',
      icon: '⏳',
    },
    {
      title: 'Contactés',
      value: stats.contactedCount,
      color: 'bg-purple-500',
      icon: '📞',
    },
    {
      title: 'Résolus',
      value: stats.resolvedCount,
      color: 'bg-green-500',
      icon: '✅',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className={`${stat.color} p-4`}>
            <div className="flex items-center justify-between">
              <div className="text-white text-2xl">{stat.icon}</div>
              <div className="text-white text-3xl font-bold">{stat.value}</div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-gray-700 font-semibold">{stat.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
