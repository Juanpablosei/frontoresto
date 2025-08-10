import React from 'react';
import { Button } from '../buttons';
import { UserInfo } from '../auth';
import { LanguageSelector } from '../language';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';

interface DashboardHeaderProps {
  onBackToUsers: () => void;
  onShowRestaurants: () => void;
  onCreateRestaurant: () => void;
  isAdmin: boolean;
  isOwner: boolean;
  showUsers: boolean;
  showRestaurants: boolean;
  showingUserRestaurants: boolean;
  selectedUser: any;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBackToUsers,
  onShowRestaurants,
  onCreateRestaurant,
  isAdmin,
  isOwner,
  showUsers,
  showRestaurants,
  showingUserRestaurants,
  selectedUser
}) => {
  const { t } = useTranslation();
  const { getBackgroundGradient } = useThemeColors();

  return (
    <div 
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 py-8"
      style={{ background: getBackgroundGradient() }}
    >
                    <div className="max-w-6xl mx-auto px-8">
         {/* Primera fila - Caja admin y selector de idioma */}
         <div className="flex items-center justify-between mb-6">
           {/* Caja Admin del Sistema */}
           <div className="flex justify-start">
             <UserInfo />
           </div>

           {/* Selector de idioma a la derecha */}
           <div className="flex justify-end">
             <LanguageSelector />
           </div>
         </div>

         {/* Segunda fila - Botones de navegación */}
         <div className="flex items-center justify-start">
           {/* Botones de navegación */}
           <div className="flex gap-4">
             {isAdmin && showingUserRestaurants && (
               <Button
                 variant="secondary"
                 size="medium"
                 onClick={onBackToUsers}
               >
                 ← {t('dashboard.backToUsers')}
               </Button>
             )}
             
             {isOwner && (
               <Button
                 variant="secondary"
                 size="medium"
                 onClick={onShowRestaurants}
               >
                 🏪 {t('dashboard.myRestaurants')}
               </Button>
             )}
           </div>
         </div>
       </div>
    </div>
  );
};

export default DashboardHeader;
