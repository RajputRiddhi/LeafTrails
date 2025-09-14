
import React from 'react';
import type { UserProfile } from '../types';
import { BADGES } from '../constants';

interface UserProfileCardProps {
  userProfile: UserProfile;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userProfile }) => {
  const earnedBadges = BADGES.filter(badge => userProfile.badges.includes(badge.id));
  const unearnedBadges = BADGES.filter(badge => !userProfile.badges.includes(badge.id));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-fade-in">
      <div className="text-center">
        <img src={`https://picsum.photos/seed/${userProfile.name}/100`} alt="User Avatar" className="w-24 h-24 mx-auto rounded-full shadow-md" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">{userProfile.name}</h2>
        <p className="text-sm text-eco-green-dark dark:text-eco-green-light">Level {Math.floor(userProfile.ecoPoints / 500) + 1} Traveler</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
        <div>
          <p className="text-2xl font-bold text-eco-blue dark:text-eco-blue-light">{userProfile.ecoPoints.toLocaleString()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Eco Points</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-eco-blue dark:text-eco-blue-light">{userProfile.trips}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Trips Taken</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-semibold text-gray-700 dark:text-gray-300">Achievements</h3>
        <div className="flex flex-wrap gap-3">
          {earnedBadges.map(badge => (
            <div key={badge.id} className="p-2 text-center transition-transform duration-200 rounded-md bg-eco-green-light/30 hover:scale-105" title={`${badge.name}: ${badge.description}`}>
              <badge.icon className="w-8 h-8 mx-auto text-eco-green-dark" />
              <p className="mt-1 text-xs font-semibold text-eco-green-dark">{badge.name}</p>
            </div>
          ))}
           {unearnedBadges.map(badge => (
            <div key={badge.id} className="p-2 text-center transition-transform duration-200 rounded-md bg-gray-200 dark:bg-gray-700 opacity-60" title={`${badge.name}: ${badge.description}`}>
              <badge.icon className="w-8 h-8 mx-auto text-gray-400" />
              <p className="mt-1 text-xs font-semibold text-gray-500">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
