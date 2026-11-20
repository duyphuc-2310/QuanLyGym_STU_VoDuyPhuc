import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, X, Send, User, Dumbbell, 
  Flame, Apple, Activity, ChevronRight, CheckCircle2 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

interface CityAICoachModalProps {
  memberName?: string;
  memberWeight?: number;
  memberBmr?: number;
  memberBmi?: number;
}

export const CityAICoachModal: React.FC<CityAICoachModalProps> = ({
  memberName = 'Hội Viên',
  memberWeight = 68.2,
  memberBmr = 1675,
  memberBmi = 23.1,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Chào **${memberName}**! Tôi là **CityAI Coach** — Trợ lý ảo luyện tập và dinh dưỡng thể hình 24/7 của hệ thống CITYGYM (STU 2026).\n\nTôi đã đồng bộ hồ sơ thể chất của bạn: **Cân nặng ${memberWeight}kg, BMI ${memberBmi}, BMR ${memberBmr} kcal**.\n\nHôm nay bạn muốn tôi tư vấn về nội dung nào?`,
      timestamp: 'Vừa xong',
      suggestions: [
        '💪 Lịch tập ngực & tay sau tối ưu',
        '🥗 Tính Macro & Calo giảm mỡ',
        '🔥 Bài tập Cardio đốt mỡ nhanh',
        '📊 Đánh giá chỉ số InBody của tôi'
      ],
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Response generation simulation
    setTimeout(() => {
      let aiReply = '';
      let suggestions: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('ngực') || lower.includes('tay sau') || lower.includes('lịch tập')) {
        aiReply = `### 💪 Giáo Án Tập Ngực & Tay Sau Chuẩn NASM CPT:
1. **Khởi động động (5 phút):** Xoay khớp vai, Band Pull-Apart 2x15 reps.
2. **Barbell Bench Press (Đẩy ngực ngang):** 4 hiệp × 8-10 reps (Nghỉ 90s). Tác động toàn diện cơ ngực lớn.
3. **Incline Dumbbell Press (Đẩy ngực trên với tạ đơn):** 3 hiệp × 10-12 reps. Giúp ngực trên đầy đặn.
4. **Chest Dips (Xà kép chúi người):** 3 hiệp × tối đa reps. Tạo rãnh ngực dưới sắc nét.
5. **Triceps Rope Pushdown (Kéo cáp tay sau):** 3 hiệp × 12-15 reps.
6. **Overhead Dumbbell Extension (Duỗi tạ sau đầu):** 3 hiệp × 12 reps.

💡 **Mẹo Coach:** Kiểm soát pha hạ tạ (Eccentric) trong 2-3 giây để tối đa hóa vi tổn thương cơ bắp (Hypertrophy)!`;
        suggestions = ['🥗 Ăn gì sau buổi tập ngực?', '⏱️ Nghỉ bao lâu giữa các hiệp?'];
      } else if (lower.includes('macro') || lower.includes('calo') || lower.includes('giảm mỡ') || lower.includes('dinh dưỡng')) {
        const targetCalo = Math.round(memberBmr * 1.4 - 400); // Deficit
        const protein = Math.round(memberWeight * 2.0); // 2g/kg
        const fat = Math.round(memberWeight * 0.8);
        const carbs = Math.round((targetCalo - protein * 4 - fat * 9) / 4);

        aiReply = `### 🥗 Kế Hoạch Macro & Calo Cá Nhân Hóa:
Dựa trên chỉ số BMR **${memberBmr} kcal** và cân nặng **${memberWeight}kg**:

- 🔥 **Mục tiêu Calo mỗi ngày (Deficit nhẹ):** **${targetCalo} kcal**
- 🥩 **Protein (Đạm):** **${protein}g** (chiếm ~${protein * 4} kcal) → Ức gà, thịt bò nạc, cá hồi, trứng, Whey Protein.
- 🥑 **Fat (Chất béo tốt):** **${fat}g** (chiếm ~${fat * 9} kcal) → Dầu ô liu, quả bơ, các loại hạt hạnh nhân.
- 🍚 **Carbs (Tinh bột hấp thụ chậm):** **${carbs}g** (chiếm ~${carbs * 4} kcal) → Gạo lứt, khoai lang, yến mạch.
- 💧 **Nước lọc tối thiểu:** **${(memberWeight * 0.04).toFixed(1)} lít/ngày**.`;
        suggestions = ['📸 Hướng dẫn quét AI Food Scanner', '💪 Lịch tập kết hợp giảm mỡ'];
      } else if (lower.includes('inbody') || lower.includes('chỉ số')) {
        aiReply = `### 📊 Phân Tích Chỉ Số Thể Hình InBody:
- **Cân nặng:** ${memberWeight} kg (Rất cân đối so với chiều cao).
- **Chỉ số khối BMI:** **${memberBmi}** (Mức tiêu chuẩn bình thường theo WHO Châu Á).
- **Chuyển hóa cơ bản BMR:** **${memberBmr} kcal/ngày** — mức đốt năng lượng tự nhiên khá tốt.

🎯 **Lời khuyên từ HLV Trưởng:**
Bạn đang ở giai đoạn **Body Recomposition (Tái cấu trúc cơ thể)** lý tưởng. Nên giữ mức thâm hụt calo nhẹ khoảng 300 kcal/ngày kết hợp tập tạ nặng 4 buổi/tuần để giảm thêm mỡ bụng và tăng độ nét cơ bắp!`;
        suggestions = ['💪 Lịch tập ngực & tay sau tối ưu', '🔥 Bài tập Cardio đốt mỡ nhanh'];
      } else {
        aiReply = `Tôi đã nhận yêu cầu của bạn về: *"${text}"*.\n\nTheo nguyên lý thể hình khoa học và giáo trình STU Fitness: Để đạt kết quả bền vững, bạn hãy kết hợp **Dinh dưỡng chuẩn Macro (Đủ đạm)** + **Tập kháng lực có tính lũy tiến (Progressive Overload)** + **Ngủ đủ 7-8 tiếng** mỗi đêm.\n\nBạn có muốn đặt lịch hẹn 1-1 với Huấn Luyện Viên cá nhân (PT) tại phòng tập hôm nay không?`;
        suggestions = ['💪 Xem lịch tập gợi ý', '🥗 Xem thực đơn 4 bữa'];
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button (Always visible on Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white rounded-full shadow-2xl shadow-city-red/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="Trợ lý ảo CityAI Coach 24/7"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-city-red/40 animate-ping opacity-75"></span>
          
          <Bot className="w-6 h-6 relative z-10" />
          
          {/* Badge */}
          <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 font-black text-[9px] px-1.5 py-0.5 rounded-full border-2 border-white shadow">
            AI
          </span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-[420px] max-h-[600px] h-[78vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-city-dark text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-city-red to-city-accent flex items-center justify-center shadow-md shadow-city-red/40">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-xs uppercase tracking-wider text-white">CityAI Coach</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    24/7 LIVE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Trợ Lý Thể Hình & Dinh Dưỡng STU</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span>Hồ sơ: <strong className="text-slate-900">{memberName}</strong></span>
            <span>Cân nặng: <strong className="text-city-red">{memberWeight}kg</strong></span>
            <span>BMR: <strong className="text-emerald-700">{memberBmr} kcal</strong></span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-100/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-city-red text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-city-red text-white rounded-tr-none font-medium'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>

                  {/* Suggestions Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="text-[10px] bg-white hover:bg-red-50 text-slate-700 hover:text-city-red px-2.5 py-1 rounded-full border border-slate-300 hover:border-city-red transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <span>{sug}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[9px] text-slate-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic">
                <div className="w-6 h-6 rounded-lg bg-city-red/20 text-city-red flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <span>CityAI Coach đang soạn câu trả lời...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi về bài tập, macro, dinh dưỡng..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-city-red"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-city-red hover:bg-city-darkred disabled:bg-slate-300 text-white flex items-center justify-center transition-all shadow-md shadow-city-red/30 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

