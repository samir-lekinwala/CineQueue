import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import Home from './pages/Home.tsx'
import DetailsPage from './pages/DetailsPage.tsx'
import Seen from './pages/Seen.tsx'
import Watchlist from './pages/Watchlist.tsx'
import Dashboard from './pages/Dashboard.tsx'
import SearchResults from './pages/SearchResults.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Home />} />
    <Route path="details/:type/:id" element={<DetailsPage />} />
    <Route path="seen" element={<Seen />} />
    <Route path="watchlist" element={<Watchlist />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="results" element={<SearchResults />} />
  </Route>
)
