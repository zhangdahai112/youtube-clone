import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Header,
  Sidebar,
  VideoPlayer,
  MainLayout,
  VideoGrid,
  mockVideos
} from './Components';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter videos based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVideos(mockVideos);
    } else {
      const filtered = mockVideos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchQuery]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedVideo(null); // Return to home view when searching
  };

  // Handle video click
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  // Handle back to home
  const handleBack = () => {
    setSelectedVideo(null);
  };

  return (
    <BrowserRouter>
      <div className={`App ${isDarkMode ? 'dark' : ''}`}>
        <Header
          onSearch={handleSearch}
          searchQuery={searchQuery}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        
        <Sidebar isOpen={sidebarOpen} isDarkMode={isDarkMode} />
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        <Routes>
          <Route
            path="/"
            element={
              selectedVideo ? (
                <VideoPlayer
                  video={selectedVideo}
                  onBack={handleBack}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <MainLayout sidebarOpen={sidebarOpen} isDarkMode={isDarkMode}>
                  <div className="max-w-7xl mx-auto">
                    {searchQuery && (
                      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Search results for "{searchQuery}"
                      </h2>
                    )}
                    <VideoGrid
                      videos={filteredVideos}
                      onVideoClick={handleVideoClick}
                      isDarkMode={isDarkMode}
                    />
                    {filteredVideos.length === 0 && (
                      <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p className="text-xl">No videos found</p>
                        <p className="mt-2">Try searching for something else</p>
                      </div>
                    )}
                  </div>
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;