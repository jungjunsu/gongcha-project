import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MyPageWithTransition from '@/components/MyPageWithTransition';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import BottomNav from '@/nav/BottomNav';
import MainPage from '@/pages/MainPage';
import ClubPage from '@/pages/ClubPage';
import MyPage from '@/pages/MyPage';
import FindMatchBoardPage from '@/pages/FindMatchBoardPage';
import MarketBoardPage from '@/pages/MarketBoardPage';
import ProfilePage from '@/pages/ProfilePage';
import PlayHistoryPage from '@/pages/PlayHistoryPage';
import FindMatchInputPage from '@/pages/FindMatchInputPage';
import FindMatchDetailPage from '@/pages/FindMatchDetailPage';
import PlaySchedulePage from '@/pages/PlaySchedulePage';
import PlayerCardPage from '@/pages/PlayerCardPage';
import AlarmPage from '@/pages/AlarmPage';
import { Toaster } from '@/components/ui/sonner';
import FirebaseComponent from '@/firebase/firebaseConfig';
import { testStore } from '@/stores/testStore';
import { toast } from 'sonner';
import { setToken } from '@/apis/api/token';
import ProtectedRoute from '@/router/ProtectedRoute';
import Redirection from '@/router/Redirection';
const { VITE_AUTH_URL } = import.meta.env;

function App() {
    const { token, payload } = testStore();
    const [localToken, setLocalToken] = useState(token);
    const [localPayload, setLocalPayload] = useState(payload);

    useEffect(() => {
        const test = token;
        setLocalToken(token);
    }, [token]);
    useEffect(() => {
        if (localToken) {
            // toast('device token', {
            //     description: localToken,
            //     className: 'toaster',
            //     action: {
            //         label: "확인",
            //         onClick: () => console.log("이벤트 확인"),
            //     },
            // });
            // axios for db connection
            setToken(
                {
                    token: localToken,
                },
                (success) => {
                    console.log(success.data.message);
                },
                (fail) => {}
            );
        }
    }, [localToken]);
    useEffect(() => {
        if (payload !== null) {
            const title = payload.notification.title;
            const body = payload.notification.body;
            setLocalPayload(payload);
            toast(title, {
                description: body,
                className: 'toaster',
                action: {
                    label: '확인',
                    onClick: () => console.log('이벤트 확인'),
                },
            });
        }
    }, [payload]);

    const user = true;

    const router = createBrowserRouter([
        // {
        //     path: '/',
        //     element: user ? <Navigate to="/main" /> : <Navigate to="/login" />,
        // },
        {
            path: '/',
            element: <Navigate to="/login" />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/kakao/callback',
            element: <Redirection />,
        },
        {
            path: '/',
            element: <BottomNav />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/main',
                    element: <MainPage />,
                },
                {
                    path: '/club',
                    element: <ClubPage />,
                },
                {
                    path: '/mypage',
                    element: (
                        <ProtectedRoute user={user}>
                            <MyPageWithTransition />
                        </ProtectedRoute>
                    ),
                    children: [
                        {
                            index: true,
                            element: <MyPage />,
                        },
                        {
                            path: 'profile',
                            element: <ProfilePage />,
                        },
                        {
                            path: 'playschedule',
                            element: <PlaySchedulePage />,
                        },
                        {
                            path: 'playercard',
                            element: <PlayerCardPage />,
                        },
                        {
                            path: 'playhistory',
                            element: <PlayHistoryPage />,
                        },
                    ],
                },
                {
                    path: '/alarm',
                    element: <AlarmPage />,
                },
                // {
                //     path: '/findplayer/board',
                //     element: <FindPlayerBoardPage />,
                // },
                // {
                //     path: '/findplayer/input',
                //     element: <FindPlayerInputPage />,
                // },
                // {
                //     path: '/findplayer/detail',
                //     element: <FindPlayerDetailPage />,
                // },
                {
                    path: '/findmatch/board',
                    element: <FindMatchBoardPage />,
                },
                {
                    path: '/findmatch/input',
                    element: <FindMatchInputPage />,
                },
                {
                    path: '/findmatch/detail/:id',
                    element: <FindMatchDetailPage />,
                },
                {
                    path: '/market/board',
                    element: <MarketBoardPage />,
                },
            ],
        },
    ]);

    return (
        <>
            <FirebaseComponent />
            <Toaster />
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
