import React from 'react';
import {RoutePermittedRole} from '@crema/constants/AppEnums';

const MusicComponent = React.lazy(() => import('../../../modules/dashboards/MusicApp'));


export const musicRoutesConfig = [
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/dashboards/music',
    element: <MusicComponent />,
  },
];
