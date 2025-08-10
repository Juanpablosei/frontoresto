import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';

interface EmployeesTabProps {
  employees: any[];
  onAddEmployee: () => void;
  onTransferEmployee: (employee: any, e: React.MouseEvent) => void;
}

const EmployeesTab: React.FC<EmployeesTabProps> = ({
  employees,
  onAddEmployee,
  onTransferEmployee
}) => {
  const { t } = useTranslation();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getDangerColor,
    getSuccessColor,
    getInfoColor
  } = useThemeColors();

  return (
    <div className="space-y-6">
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            👥 {t('restaurant.employees')}({employees.length})
          </h3>
          <Button
            variant="primary"
            onClick={onAddEmployee}
          >
            ➕ {t('restaurant.addEmployee')}
          </Button>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noEmployees')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addEmployeesToOperate')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr 
                  className="border-b"
                  style={{ borderColor: getCardBorder() }}
                >
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.employee')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.role')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.email')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.phone')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.status')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.hired')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr 
                    key={employee.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: index % 2 === 0 ? 'transparent' : `${getCardBackground()}50`
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getInfoColor() }}
                        >
                          <span className="text-white text-sm">👤</span>
                        </div>
                        <span 
                          className="font-semibold text-sm"
                          style={{ color: getTextColor(900) }}
                        >
                          {employee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getInfoColor() }}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {employee.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {employee.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          employee.isActive ? '' : ''
                        }`}
                        style={{
                          backgroundColor: employee.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {employee.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.editEmployee')}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={(e) => onTransferEmployee(employee, e)}
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.transferEmployee')}
                        >
                          🔄
                        </button>
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.viewProfile')}
                        >
                          📊
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesTab;
