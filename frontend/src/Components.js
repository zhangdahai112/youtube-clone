import React, { useState, useEffect } from 'react';

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "React Tutorial for Beginners - Full Course",
    thumbnail: "https://images.pexels.com/photos/5077064/pexels-photo-5077064.jpeg",
    channel: "Tech Academy",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc1MTk2NjkzMHww&ixlib=rb-4.1.0&q=85",
    views: "1.2M",
    uploadTime: "2 weeks ago",
    duration: "2:45:30",
    description: "Complete React tutorial covering all essential concepts from basics to advanced topics.",
    youtubeId: "QFaFIcGhPoM"
  },
  {
    id: 2,
    title: "Gaming Setup Tour - Ultimate Battle Station",
    thumbnail: "https://images.unsplash.com/photo-1611829713792-e1841cbe2cf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB2aWRlb3xlbnwwfHx8fDE3NTE5OTU5OTR8MA&ixlib=rb-4.1.0&q=85",
    channel: "GameTech Pro",
    channelAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc1MTk2NjkzMHww&ixlib=rb-4.1.0&q=85",
    views: "856K",
    uploadTime: "1 week ago",
    duration: "12:34",
    description: "Check out my ultimate gaming setup with the latest tech and RGB lighting.",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Easy Pasta Recipe - 15 Minutes Meal",
    thumbnail: "https://images.unsplash.com/photo-1640409084317-ada21bc20d14?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxjb29raW5nJTIwdHV0b3JpYWx8ZW58MHx8fHwxNzUyMDQwNjgxfDA&ixlib=rb-4.1.0&q=85",
    channel: "Chef's Kitchen",
    channelAvatar: "https://images.pexels.com/photos/8005453/pexels-photo-8005453.jpeg",
    views: "2.4M",
    uploadTime: "3 days ago",
    duration: "8:45",
    description: "Quick and delicious pasta recipe that anyone can make at home.",
    youtubeId: "jNQXAC9IVRw"
  },
  {
    id: 4,
    title: "Latest iPhone Review - Is It Worth It?",
    thumbnail: "https://images.unsplash.com/photo-1639789976344-be81ee66fc4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3fGVufDB8fHx8MTc1MjAwNjU1OXww&ixlib=rb-4.1.0&q=85",
    channel: "Tech Reviews",
    channelAvatar: "https://images.pexels.com/photos/6333750/pexels-photo-6333750.jpeg",
    views: "3.1M",
    uploadTime: "1 day ago",
    duration: "15:22",
    description: "Comprehensive review of the latest iPhone model with pros and cons.",
    youtubeId: "YE7VzlLtp-4"
  },
  {
    id: 5,
    title: "Epic Football Highlights - Best Goals 2024",
    thumbnail: "https://images.pexels.com/photos/9944753/pexels-photo-9944753.jpeg",
    channel: "Sports Center",
    channelAvatar: "https://images.pexels.com/photos/8173473/pexels-photo-8173473.jpeg",
    views: "5.2M",
    uploadTime: "4 days ago",
    duration: "11:18",
    description: "The most amazing football goals and highlights from this season.",
    youtubeId: "M7lc1UVf-VE"
  },
  {
    id: 6,
    title: "Relaxing Jazz Music - Study & Work",
    thumbnail: "https://images.unsplash.com/photo-1490971512195-3385e8e72ab4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHZpZGVvfGVufDB8fHx8MTc1MTk5NTc0NXww&ixlib=rb-4.1.0&q=85",
    channel: "Jazz Cafe",
    channelAvatar: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg",
    views: "892K",
    uploadTime: "6 days ago",
    duration: "2:00:00",
    description: "Smooth jazz music perfect for studying, working, or relaxing.",
    youtubeId: "neV3EPgvZ3g"
  },
  {
    id: 7,
    title: "Comedy Show - Best Stand Up Moments",
    thumbnail: "https://images.unsplash.com/photo-1726935037951-d5a5a73b3243?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxlbnRlcnRhaW5tZW50JTIwdmlkZW98ZW58MHx8fHwxNzUyMDQwNjk1fDA&ixlib=rb-4.1.0&q=85",
    channel: "Comedy Central",
    channelAvatar: "https://images.pexels.com/photos/6224632/pexels-photo-6224632.jpeg",
    views: "1.8M",
    uploadTime: "5 days ago",
    duration: "25:14",
    description: "Hilarious stand-up comedy moments that will make you laugh out loud.",
    youtubeId: "X2WH8mHJnhM"
  },
  {
    id: 8,
    title: "Advanced Cooking Techniques - Master Chef Tips",
    thumbnail: "https://images.pexels.com/photos/7669751/pexels-photo-7669751.jpeg",
    channel: "Culinary Masters",
    channelAvatar: "https://images.pexels.com/photos/7482015/pexels-photo-7482015.jpeg",
    views: "645K",
    uploadTime: "1 week ago",
    duration: "18:56",
    description: "Learn professional cooking techniques used by master chefs.",
    youtubeId: "lp-EO5I60KA"
  }
];

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: "TechEnthusiast",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc1MTk2NjkzMHww&ixlib=rb-4.1.0&q=85",
    comment: "Great tutorial! This helped me understand React so much better.",
    likes: 234,
    time: "2 days ago"
  },
  {
    id: 2,
    user: "CodeNewbie",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc1MTk2NjkzMHww&ixlib=rb-4.1.0&q=85",
    comment: "Perfect explanation for beginners. Thank you!",
    likes: 128,
    time: "1 day ago"
  },
  {
    id: 3,
    user: "WebDeveloper",
    avatar: "https://images.pexels.com/photos/8005453/pexels-photo-8005453.jpeg",
    comment: "Could you make a video about Next.js next?",
    likes: 89,
    time: "3 hours ago"
  }
];

// Header Component
export const Header = ({ onSearch, searchQuery, toggleSidebar, isDarkMode, toggleTheme }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a2.268 2.268 0 0 0-1.592-1.608C20.028 4.128 12 4.128 12 4.128s-8.028 0-9.906.45a2.268 2.268 0 0 0-1.592 1.608C.05 8.064.05 12 .05 12s0 3.936.452 5.814a2.268 2.268 0 0 0 1.592 1.608c1.878.45 9.906.45 9.906.45s8.028 0 9.906-.45a2.268 2.268 0 0 0 1.592-1.608C23.95 15.936 23.95 12 23.95 12s0-3.936-.452-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>YouTube</span>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Search"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className={`flex-1 px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
            <button
              type="submit"
              className={`px-6 py-2 border-l-0 border rounded-r-full ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'text-gray-600'}`}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'text-gray-600'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" />
              </svg>
            </button>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc1MTk2NjkzMHww&ixlib=rb-4.1.0&q=85"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ isOpen, isDarkMode }) => {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '📈', label: 'Trending' },
    { icon: '📺', label: 'Subscriptions' },
    { icon: '📚', label: 'Library' },
    { icon: '📊', label: 'History' },
    { icon: '👍', label: 'Liked videos' },
    { icon: '⏰', label: 'Watch later' },
    { icon: '▶️', label: 'Your videos' },
  ];

  return (
    <aside className={`fixed top-16 left-0 h-full w-60 transition-transform duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="p-3">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                  : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

// Video Card Component
export const VideoCard = ({ video, onVideoClick, isDarkMode }) => {
  return (
    <div
      className={`cursor-pointer group ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg p-2 transition-colors`}
      onClick={() => onVideoClick(video)}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="mt-3 flex">
        <img
          src={video.channelAvatar}
          alt={video.channel}
          className="w-9 h-9 rounded-full mr-3 flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className={`font-medium text-sm line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {video.title}
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {video.channel}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {video.views} views • {video.uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ video, onBack, isDarkMode }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} pt-16`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main video section */}
          <div className="flex-1">
            <button
              onClick={onBack}
              className={`mb-4 flex items-center space-x-2 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Back</span>
            </button>

            {/* Video player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video info */}
            <div className="mt-4">
              <h1 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {video.title}
              </h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={video.channelAvatar}
                    alt={video.channel}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {video.channel}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {video.views} views • {video.uploadTime}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 10.5a1.5 1.5 0 01-3 0v-6a1.5 1.5 0 013 0v6zM14 10.333v5.43a2 2 0 01-1.106 1.79l-.05.025A4 4 0 0111.057 18H5.641a2 2 0 01-1.962-1.608l-1.2-6A2 2 0 014.44 8H8V4a2 2 0 012-2 1 1 0 011 1v.667a4 4 0 01.8 2.4l1.4 1.866a4 4 0 00.8 2.4z" />
                    </svg>
                    <span>Dislike</span>
                  </button>
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 8.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4 mt-4`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${showFullDescription ? '' : 'line-clamp-3'}`}>
                  {video.description}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className={`mt-2 text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              </div>

              {/* Comments section */}
              <div className="mt-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Comments ({mockComments.length})
                </h3>
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {comment.user}
                          </span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {comment.time}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {comment.comment}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className={`flex items-center space-x-1 text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <span>{comment.likes}</span>
                          </button>
                          <button className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with related videos */}
          <div className="w-full lg:w-96">
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Related Videos
            </h3>
            <div className="space-y-3">
              {mockVideos.filter(v => v.id !== video.id).slice(0, 6).map((relatedVideo) => (
                <div key={relatedVideo.id} className="flex space-x-3 cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <img
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      className="w-40 h-24 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {relatedVideo.title}
                    </h4>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {relatedVideo.channel}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {relatedVideo.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Layout Component
export const MainLayout = ({ children, sidebarOpen, isDarkMode }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:ml-60' : ''}`}>
        <div className="px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Video Grid Component
export const VideoGrid = ({ videos, onVideoClick, isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onVideoClick={onVideoClick}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

// Export mock data
export { mockVideos, mockComments };