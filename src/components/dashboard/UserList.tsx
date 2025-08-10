import React from 'react';
import { Button } from '../buttons';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import { getTranslatedUserName } from '../../mock/users';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

interface UserListProps {
  users: User[];
  filteredUsers: User[];
  currentUsers: User[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  onUserSelect: (user: User) => void;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  filteredUsers,
  currentUsers,
  searchTerm,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  onUserSelect,
  onSearch,
  onPageChange
}) => {
  const { t } = useTranslation();
  const { getCardBackground, getCardBorder, getTextColor, getSuccessColor, getDangerColor } = useThemeColors();

  return (
    <div className="space-y-6">
             {/* Título de Gestión del Usuario */}
       <div className="text-center mb-6">
         <h1 className="text-3xl lg:text-4xl font-bold text-white">
           👥 {t('dashboard.userManagement')}
         </h1>
       </div>

             {/* Búsqueda */}
       <div className="relative">
         <input
           type="text"
           placeholder={t('dashboard.searchUsers')}
           value={searchTerm}
           onChange={(e) => onSearch(e.target.value)}
           className="w-full p-4 pl-12 bg-white/95 backdrop-blur-lg rounded-xl border-2 border-white/20 text-lg transition-all duration-300 focus:outline-none focus:border-white/40 focus:shadow-lg"
         />
         <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
           🔍
         </div>
       </div>

      {/* Lista de usuarios */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        {currentUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-semibold mb-2" style={{ color: getTextColor(900) }}>
              {t('dashboard.noUsersFound')}
            </h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: getCardBorder() }}>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: getTextColor(700) }}>
                    {t('common.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: getTextColor(700) }}>
                    {t('common.email')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: getTextColor(700) }}>
                    {t('common.role')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: getTextColor(700) }}>
                    {t('common.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: getTextColor(700) }}>
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr 
                    key={user.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: 'transparent'
                    }}
                  >
                                         <td className="px-6 py-4 whitespace-nowrap">
                       <div style={{ color: getTextColor(900) }}>
                         {getTranslatedUserName(user, t)}
                       </div>
                     </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: getCardBackground(),
                          color: getTextColor(700)
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive ? 'text-white' : 'text-white'
                        }`}
                        style={{
                          backgroundColor: user.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {user.isActive ? t('common.active') : t('common.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => onUserSelect(user)}
                      >
                        {t('common.viewDetails')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('dashboard.previous')}
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <Button
            variant="secondary"
            size="small"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('dashboard.next')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
