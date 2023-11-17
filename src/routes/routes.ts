import AnonymousLayout from "@/layouts/AnonymousLayout.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import SignUpPage from "@/pages/SignUpPage.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import AlbumPage from "@/pages/AlbumPage.tsx";
import AddAlbumPage from "@/pages/AddAlbumPage.tsx";
import EditAlbumPage from "@/pages/EditAlbumPage.tsx";
import SongsPage from "@/pages/SongsPage.tsx";
import AddSongPage from "@/pages/AddSongPage.tsx";
import EditSongPage from "@/pages/EditSongPage.tsx";
import NotMatchLayout from "@/layouts/NotMatchLayout.tsx";
import NotMatch from "@/pages/NotMatch.tsx";
import DeleteAlbumDialog from "@/components/delete-dialog-album";
import DeleteSongDialog from "@/components/delete-dialog-song";
import SubscriptionPage from "@/pages/SubscriptionPage.tsx";
import {ReactNode} from "react";

export type Route = {
  name: string;
  title: string;
  component?: () => ReactNode,
  path?: string;
  isPublic?: boolean;
  hasSiderLink?: boolean;
  routes?: Array<Route>;
}
export type RouteWithLayout = {
  layout: () => ReactNode,
  routes: Array<Route>
}
export const routes: RouteWithLayout[] = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: "login",
        title: "Login to Tonality",
        component: LoginPage,
        path: "/login",
        isPublic: true,
      },
      {
        name: "signup",
        title: "Sign Up for Tonality",
        component: SignUpPage,
        path: "/signup",
        isPublic: true,
      },
    ],
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: "album",
        title: "Album",
        hasSiderLink: true,
        routes: [
          {
            name: "album",
            title: "Album page",
            component: AlbumPage,
            path: "/album",
          },
          {
            name: "add-album",
            title: "Add Album page",
            component: AddAlbumPage,
            path: "/add-album",
          },
          {
            name: "edit-album",
            title: "Edit Album page",
            component: EditAlbumPage,
            path: "/:albumId/edit-album",
          },
          {
            name: "delete-album",
            title: "Delete Album page",
            component: DeleteAlbumDialog,
            path: "/:albumId/delete-album/",
          },
        ],
      },
      {
        name: "song",
        title: "Song",
        hasSiderLink: true,
        routes: [
          {
            name: "song",
            title: "Song page",
            component: SongsPage,
            path: "/:albumId/songs",
          },
          {
            name: "add-song",
            title: "Add Song page",
            component: AddSongPage,
            path: "/:albumId/add-song",
          },
          {
            name: "edit-song",
            title: "Edit Song page",
            component: EditSongPage,
            path: "/:albumId/edit-song/:songId",
          },
          {
            name: "delete-song",
            title: "Delete Song page",
            component: DeleteSongDialog,
            path: "/:albumId/delete-song/:songId",
          },
        ],
      },
      {
        name: "subscription",
        title: "Subscription",
        component: SubscriptionPage,
        path: "/subscription",
      }
    ],
  },
  {
    layout: NotMatchLayout,
    routes: [
      {
        name: "not-match",
        title: "Not Match",
        component: NotMatch,
        path: "*",
      },
    ],
  },
];
