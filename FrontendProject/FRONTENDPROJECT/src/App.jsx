import React from 'react';
import AppStore from './Redux/AppStore'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import Login from './usercomponents/Login';
import Signup from './usercomponents/Signup';
import MainPage from './usercomponents/MainPage';
import GameUpload from './Admincomponents/GameUpload';
import Admin from './Admincomponents/Admin';
import Games from './Admincomponents/Games';
import Profile from './usercomponents/Profile';
import ProductPage from './usercomponents/ProductPage';
import Library from './usercomponents/Library';
import Paymentpage from './usercomponents/Paymentpage';
import Store from './usercomponents/Store';
import Review from './usercomponents/Review';

function App ()
{

    const AppRouter = createBrowserRouter ([
      {
        path:'/login',
        element:<Login />
      },
      {
        path:'/',
        element:<Signup />
      },
      {
        path:'/main',
        element:<MainPage />
      },
      {
        path:'/gameupload',
        element:<GameUpload />
      },
      {
        path:'/admin',
        element:<Admin />
      },
      {
        path:'/gamesall',
        element:<Games />
      },
      {
        path:'/profile',
        element:<Profile />
      },
      {
        path:'/product/:gameid',
        element:<ProductPage />
      },
      {
        path:"/library",
        element:<Library />
      },
      {
        path:'/payment/:gameid',
        element:<Paymentpage />
      },
      {
        path:'/store',
        element:<Store />
      },
      {
        path:'/review/:gameid',
        element:<Review />
      }
    ])
    return(
        <Provider store = {AppStore}>
            <RouterProvider router={AppRouter} future={{ v7_startTransition: true,}}/>
        </ Provider>
    )
}

export default App;