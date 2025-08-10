import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const TestCredentials: React.FC = () => {
  const { t } = useTranslation();

  const credentials = [
    {
      role: t('auth.admin'),
      name: t('auth.adminSystem'),
      email: 'admin@restaurant.com',
      password: 'admin123',
      color: 'from-red-600 to-red-700'
    },
    {
      role: t('auth.clientOwner'),
      name: t('auth.mariaGonzalez'),
      email: 'maria@buensabor.com',
      password: 'maria123',
      color: 'from-green-600 to-green-700'
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 order-first lg:order-last">
      <h3 className="text-2xl font-bold mb-6 text-center">
        🔑 {t('auth.testCredentials')}
      </h3>
      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
        {credentials.map((credential, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <span className={`bg-gradient-to-r ${credential.color} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
                {credential.role}
              </span>
              <span className="font-semibold text-gray-700 text-sm">
                {credential.name}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">📧 {t('common.email')}:</span>
                <span className="text-gray-700 font-semibold font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">
                  {credential.email}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">🔒 {t('auth.password')}:</span>
                <span className="text-gray-700 font-semibold font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">
                  {credential.password}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCredentials;
