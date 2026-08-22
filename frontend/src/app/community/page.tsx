import { Heart, MessageCircle, Share2, MapPin } from "lucide-react";

export default function CommunityPage() {
  const posts = [
    {
      id: 1,
      user: "Alex Wanderlust",
      avatar: "AW",
      location: "Kyoto, Japan",
      image: true,
      content: "Just finished my 2-week itinerary for Japan! The temples in Kyoto are absolutely breathtaking.",
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      user: "Sarah Travels",
      avatar: "ST",
      location: "Rome, Italy",
      image: false,
      content: "Anyone have recommendations for off-the-beaten-path pasta places in Rome? Looking for something authentic!",
      likes: 45,
      comments: 32
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-24 relative">
      <header className="pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">Community</h1>
        <p className="text-slate-500 font-medium mt-2">Get inspired and connect with fellow travelers.</p>
      </header>

      {/* Create Post */}
      <div className="bg-white rounded-3xl p-6 flex gap-6 shadow-sm border border-slate-100">
        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0">
          ME
        </div>
        <div className="flex-1 space-y-4">
          <textarea 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-600 placeholder-slate-400"
            placeholder="Share your travel experiences..."
          ></textarea>
          <div className="flex justify-end">
            <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors shadow-md">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-[2rem] p-6 md:p-8 space-y-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-lg">
                {post.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{post.user}</h3>
                <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                  <MapPin className="w-4 h-4" /> {post.location}
                </p>
              </div>
            </div>

            <p className="text-slate-700 font-medium leading-relaxed px-2">
              {post.content}
            </p>

            {post.image && (
              <div className="w-full h-64 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 font-medium">
                [Image placeholder]
              </div>
            )}

            <div className="flex items-center gap-8 pt-4 border-t border-slate-100 px-2">
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-rose-500 font-bold transition-colors group">
                <div className="p-2.5 bg-slate-50 rounded-full group-hover:bg-rose-50 transition-colors"><Heart className="w-5 h-5" /></div>
                {post.likes}
              </button>
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-blue-500 font-bold transition-colors group">
                <div className="p-2.5 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors"><MessageCircle className="w-5 h-5" /></div>
                {post.comments}
              </button>
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-amber-500 font-bold transition-colors ml-auto group">
                <div className="p-2.5 bg-slate-50 rounded-full group-hover:bg-amber-50 transition-colors"><Share2 className="w-5 h-5" /></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
