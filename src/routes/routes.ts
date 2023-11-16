import AnonymousLayout from "@/layouts/AnonymousLayout.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import AlbumPage from "@/pages/AlbumPage.tsx";
import AddAlbumPage from "@/pages/AddAlbumPage.tsx";
import EditAlbumPage from "@/pages/EditAlbumPage.tsx";
import SongsPage from "@/pages/SongsPage.tsx";
import AddSongPage from "@/pages/AddSongPage.tsx";
import EditSongPage from "@/pages/EditSongPage.tsx";
import {NotMatchLayout} from "@/layouts/NotMatchLayout.tsx";
import NotMatch from "@/pages/NotMatch.tsx";

export const routes = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: LoginPage,
        path: "/login",
        isPublic: true,
      }
    ]
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: 'album',
        title: 'Album',
        hasSiderLink: true,
        routes: [
          {
            name: 'album',
            title: 'Album page',
            component: AlbumPage,
            path: "/album",
          },
          {
            name: 'add-album',
            title: 'Add Album page',
            component: AddAlbumPage,
            path: "/add-album",
          },
          {
            name: 'edit-album',
            title: 'Edit Album page',
            component: EditAlbumPage,
            path: "/:albumId/edit-album",
          }
        ]
      },
      {
        name: 'song',
        title: 'Song',
        hasSiderLink: true,
        routes: [
          {
            name: 'song',
            title: 'Song page',
            component: SongsPage,
            path: "/:albumId/songs",
          },
          {
            name: 'add-song',
            title: 'Add Song page',
            component: AddSongPage,
            path: "/:albumId/add-song",
          },
          {
            name: 'edit-song',
            title: 'Edit Song page',
            component: EditSongPage,
            path: "/:albumId/edit-song/:songId",
          }
        ]
      }
    ]
  },
  {
    layout: NotMatchLayout,
    routes: [
      {
        name: 'not-match',
        title: 'Not Match',
        component: NotMatch,
        path: "*",
      }
    ]
  }
]
