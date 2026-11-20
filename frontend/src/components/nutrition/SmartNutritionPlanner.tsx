import React, { useState } from 'react';
import { 
  Camera, Upload, Sparkles, Utensils, CheckCircle2, AlertCircle, 
  Flame, Activity, Droplets, Target, ChevronRight, Apple, Heart, 
  RefreshCw, Info, PlusCircle, Trash2, Award, Zap, BarChart2
} from 'lucide-react';
import { FoodNutritionItem, DailyMealPlan, MealRecommendation } from '../../types';

interface SmartNutritionPlannerProps {
  memberWeight?: number;
  memberHeight?: number;
  memberBmr?: number;
}

// 6 món ăn mẫu Việt Nam & Fitness quen thuộc để demo 1-chạm
const SAMPLE_DISHES: FoodNutritionItem[] = [
  {
    id: 'dish-1',
    foodName: 'Ức Gà Áp Chảo + Bông Cải Xanh + Khoai Lang',
    portionGrams: 380,
    calories: 465,
    protein: 48,
    carbs: 52,
    fat: 6,
    fiber: 8,
    sodium: 320,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    healthScore: 9.8,
    tags: ['Chuẩn Gym', 'Siêu Đạm Nạc', 'Ít Mỡ'],
    analysisNotes: 'Phát hiện 180g ức gà phi lê, 120g khoai lang vàng luộc và 80g bông cải xanh hấp.',
    coachAdvice: 'Bữa ăn mẫu mực cho gymer! Tinh bột hấp thu chậm (Low GI) từ khoai lang kết hợp đạm nạc giúp hồi phục và xây dựng sợi cơ sau tập.',
  },
  {
    id: 'dish-2',
    foodName: 'Phở Bò Tái Nạc (Ít Bánh, Nhiều Hành)',
    portionGrams: 550,
    calories: 520,
    protein: 38,
    carbs: 64,
    fat: 12,
    fiber: 3,
    sodium: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80',
    healthScore: 8.2,
    tags: ['Món Việt', 'Giàu Đạm', 'Lưu ý Natri'],
    analysisNotes: 'Nhận diện 150g thịt bò nạc tái (Protein cao), bánh phở tươi, nước dùng xương hầm trong veo.',
    coachAdvice: 'Bữa trưa nạp năng lượng rất tốt. Nên hạn chế húp hết nước béo để kiểm soát lượng muối (Natri) và mỡ bão hòa.',
  },
  {
    id: 'dish-3',
    foodName: 'Salad Cá Hồi Áp Chảo Quả Bơ Sốt Mè Rang',
    portionGrams: 320,
    calories: 490,
    protein: 35,
    carbs: 18,
    fat: 32,
    fiber: 7,
    sodium: 410,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    healthScore: 9.4,
    tags: ['Omega-3', 'Keto / Low-Carb', 'Healthy Fat'],
    analysisNotes: 'Nhận diện 140g phi lê cá hồi Na Uy, 1/2 quả bơ sáp, xà lách Romaine, cà chua bi và sốt mè rang.',
    coachAdvice: 'Cung cấp chất béo tốt Omega-3 chống viêm khớp sau các bài tập nặng (Squat/Deadlift) và hỗ trợ hệ tim mạch.',
  },
  {
    id: 'dish-4',
    foodName: 'Cơm Tấm Sườn Bì Chả Trứng Ốp La',
    portionGrams: 500,
    calories: 860,
    protein: 36,
    carbs: 95,
    fat: 38,
    fiber: 2,
    sodium: 1820,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    healthScore: 5.8,
    tags: ['Cảnh Báo Calo Cao', 'Nhiều Mỡ Xấu', 'Cheat Meal'],
    analysisNotes: 'Phát hiện sườn nướng mỡ hành, chả trứng hấp, bì heo chiên giòn, trứng ốp la lòng đào và mỡ hành.',
    coachAdvice: 'Món ăn có năng lượng và chất béo cao! Thích hợp cho ngày "Cheat Day" xả cơ, không khuyến nghị trong giai đoạn siết mỡ.',
  },
  {
    id: 'dish-5',
    foodName: 'Yến Mạch Sữa Chua Hy Lạp + Chuối + Whey Protein',
    portionGrams: 300,
    calories: 395,
    protein: 34,
    carbs: 55,
    fat: 5,
    fiber: 6,
    sodium: 120,
    imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&auto=format&fit=crop&q=80',
    healthScore: 9.7,
    tags: ['Bữa Sáng Nhanh', 'Pre-Workout', 'Dễ Tiêu'],
    analysisNotes: 'Gồm 50g yến mạch cán dẹt, 1 quả chuối sứ, 100g sữa chua Hy Lạp không đường và 1 muỗng Whey Isolate.',
    coachAdvice: 'Bữa phụ trước tập 60 phút hoàn hảo: cung cấp Glycogen nhanh từ chuối và đạm thẩm thấu nhanh từ Whey.',
  },
  {
    id: 'dish-6',
    foodName: 'Bún Bò Huế Bắp Bò Nạc + Chả Cua',
    portionGrams: 580,
    calories: 610,
    protein: 42,
    carbs: 68,
    fat: 18,
    fiber: 4,
    sodium: 1680,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    healthScore: 7.9,
    tags: ['Đậm Đà', 'Nhiều Đạm', 'Bắp Bò Nạc'],
    analysisNotes: 'Bắp hoa bò luộc thái mỏng (160g), chả cua Huế, bún sợi to, rau chuối bắp và giá đỗ.',
    coachAdvice: 'Bắp bò giàu kẽm và Creatine tự nhiên giúp bùng nổ sức mạnh cơ bắp. Nên ăn kèm nhiều rau muống chẻ và giá.',
  },
];

// Dữ liệu gợi ý bữa ăn theo 3 mục tiêu
const MEAL_PLANS_BY_GOAL: Record<'LOSE_FAT' | 'GAIN_MUSCLE' | 'MAINTAIN', DailyMealPlan> = {
  LOSE_FAT: {
    goal: 'LOSE_FAT',
    targetCalories: 1750,
    targetProtein: 155, // grams
    targetCarbs: 145,
    targetFat: 42,
    waterIntakeLiters: 2.8,
    meals: [
      {
        mealType: 'SÁNG',
        timeSlot: '07:00 - 07:30',
        dishName: 'Trứng ốp la 2 quả + Bánh mì đen + Bơ lạt',
        ingredients: ['2 quả trứng gà ta', '1 lát bánh mì nguyên cám đen', '30g quả bơ', '1 ly trà xanh ấm'],
        calories: 380,
        protein: 22,
        carbs: 28,
        fat: 18,
        tips: 'Bữa sáng giàu đạm và chất béo tốt giúp no lâu, giảm cảm giác thèm ăn vặt suốt buổi sáng.',
      },
      {
        mealType: 'TRƯA',
        timeSlot: '12:00 - 12:45',
        dishName: 'Ức gà áp chảo + Khoai lang luộc + Salad dầu giấm',
        ingredients: ['180g ức gà phi lê', '150g khoai lang vàng', '150g rau xà lách, dưa leo', '1 thìa dầu olive'],
        calories: 460,
        protein: 45,
        carbs: 48,
        fat: 8,
        tips: 'Khoai lang cung cấp carbohydrate chuyển hóa chậm, giữ đường huyết ổn định.',
      },
      {
        mealType: 'PHỤ (PRE-WORKOUT)',
        timeSlot: '16:30 - 17:00',
        dishName: 'Táo xanh + 1 muỗng Whey Protein hoặc Sữa chua',
        ingredients: ['1 quả táo xanh giòn', '1 muỗng Whey Isolate pha 250ml nước lạnh'],
        calories: 220,
        protein: 26,
        carbs: 25,
        fat: 2,
        tips: 'Uống trước giờ tập 45 phút để tối ưu hóa năng lượng nâng tạ và chống dị hóa cơ.',
      },
      {
        mealType: 'TỐI',
        timeSlot: '19:00 - 19:45',
        dishName: 'Cá hồi áp chảo + Bông cải xanh xào tỏi dầu olive',
        ingredients: ['150g cá hồi tươi', '150g bông cải xanh luộc/áp chảo', 'Cà chua bi tươi'],
        calories: 420,
        protein: 38,
        carbs: 12,
        fat: 22,
        tips: 'Hạn chế tinh bột vào bữa tối, ưu đãi chất xơ và đạm để hệ tiêu hóa nhẹ nhàng trước khi ngủ.',
      },
    ],
  },
  GAIN_MUSCLE: {
    goal: 'GAIN_MUSCLE',
    targetCalories: 2450,
    targetProtein: 185,
    targetCarbs: 280,
    targetFat: 62,
    waterIntakeLiters: 3.5,
    meals: [
      {
        mealType: 'SÁNG',
        timeSlot: '07:00 - 07:30',
        dishName: 'Phở bò tái nhiều thịt + 2 quả trứng chần',
        ingredients: ['180g nạc bò thái lát', 'Bánh phở tươi 150g', '2 quả trứng lòng đào', 'Hành ngò, rau thơm'],
        calories: 620,
        protein: 48,
        carbs: 65,
        fat: 16,
        tips: 'Cung cấp lượng đạm cao và sắt kích thích sản sinh hồng cầu vận chuyển oxy đến cơ bắp.',
      },
      {
        mealType: 'TRƯA',
        timeSlot: '12:00 - 12:45',
        dishName: 'Thịt bò xào ớt chuông + Cơm gạo lứt + Canh rong biển',
        ingredients: ['180g thăn bò nạc', '1.5 chén cơm gạo lứt', '1 quả ớt chuông', 'Canh rong biển đậu hũ'],
        calories: 680,
        protein: 52,
        carbs: 82,
        fat: 18,
        tips: 'Bò giàu Creatine tự nhiên giúp tăng sức mạnh bộc phát cho các bài tập nặng buổi chiều.',
      },
      {
        mealType: 'PHỤ (PRE-WORKOUT)',
        timeSlot: '16:00 - 16:30',
        dishName: 'Yến mạch ngâm sữa chua + 2 quả chuối + Bơ đậu phộng',
        ingredients: ['60g yến mạch', '2 quả chuối chín', '1 thìa bơ đậu phộng hạt', '1 muỗng Whey Protein'],
        calories: 480,
        protein: 35,
        carbs: 68,
        fat: 12,
        tips: 'Nạp đầy kho dự trữ Glycogen, giúp bạn đẩy tạ bền bỉ không bị đuối sức ở các hiệp cuối.',
      },
      {
        mealType: 'TỐI',
        timeSlot: '19:30 - 20:15',
        dishName: 'Ức gà nướng mật ong + Khoai tây nghiền + Măng tây',
        ingredients: ['200g ức gà phi lê', '150g khoai tây nghiền sữa tươi', '100g măng tây xào tỏi'],
        calories: 550,
        protein: 50,
        carbs: 58,
        fat: 14,
        tips: 'Cung cấp amino acid leucine kích hoạt cơ chế tổng hợp protein cơ bắp (MPS) suốt đêm.',
      },
    ],
  },
  MAINTAIN: {
    goal: 'MAINTAIN',
    targetCalories: 2050,
    targetProtein: 140,
    targetCarbs: 220,
    targetFat: 55,
    waterIntakeLiters: 3.0,
    meals: [
      {
        mealType: 'SÁNG',
        timeSlot: '07:00 - 07:30',
        dishName: 'Bánh mì nướng bơ trứng + Ly sữa hạt óc chó',
        ingredients: ['2 lát bánh mì đen', '1 quả bơ sáp dầm', '2 quả trứng chần', '200ml sữa hạt'],
        calories: 480,
        protein: 26,
        carbs: 45,
        fat: 22,
        tips: 'Cung cấp năng lượng sạch, tỉnh táo cho ngày làm việc năng suất.',
      },
      {
        mealType: 'TRƯA',
        timeSlot: '12:00 - 12:45',
        dishName: 'Cá basa áp chảo sốt chanh leo + Cơm trắng + Canh rau',
        ingredients: ['180g cá basa phi lê nạc', '1 chén cơm trắng', '1 đĩa rau luộc kho quẹt'],
        calories: 580,
        protein: 42,
        carbs: 68,
        fat: 15,
        tips: 'Cân bằng giữa đạm, tinh bột và vitamin khoáng chất.',
      },
      {
        mealType: 'PHỤ (PRE-WORKOUT)',
        timeSlot: '16:30 - 17:00',
        dishName: 'Sữa chua Hy Lạp + Hạt điều + Việt quất',
        ingredients: ['150g sữa chua Hy Lạp', '20g hạt điều rang mộc', 'Một nắm việt quất tươi'],
        calories: 280,
        protein: 18,
        carbs: 25,
        fat: 11,
        tips: 'Chống oxy hóa và bổ sung năng lượng nhẹ nhàng trước giờ tập.',
      },
      {
        mealType: 'TỐI',
        timeSlot: '19:00 - 19:45',
        dishName: 'Tôm hấp nước dừa + Salad rong nho + Canh bí đỏ',
        ingredients: ['200g tôm sú tươi', '100g rong nho biển', '1 bát canh bí đỏ nấu thịt nạc'],
        calories: 490,
        protein: 44,
        carbs: 42,
        fat: 12,
        tips: 'Hàm lượng canxi và khoáng chất cao, hỗ trợ tái tạo xương khớp và thư giãn thần kinh.',
      },
    ],
  },
};

export const SmartNutritionPlanner: React.FC<SmartNutritionPlannerProps> = ({
  memberWeight = 68,
  memberHeight = 172,
  memberBmr = 1675,
}) => {
  // Navigation sub-tab
  const [activeTab, setActiveTab] = useState<'AI_SCANNER' | 'MEAL_PLANNER' | 'DAILY_LOG'>('AI_SCANNER');

  // Goal Selector
  const [selectedGoal, setSelectedGoal] = useState<'LOSE_FAT' | 'GAIN_MUSCLE' | 'MAINTAIN'>('GAIN_MUSCLE');

  // AI Scanner State
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [currentScannedFood, setCurrentScannedFood] = useState<FoodNutritionItem | null>(SAMPLE_DISHES[0]);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);

  // Daily Nutrition Tracker Log (Danh sách món đã ăn trong ngày)
  const [loggedFoods, setLoggedFoods] = useState<FoodNutritionItem[]>([
    SAMPLE_DISHES[0], // Ức gà
    SAMPLE_DISHES[4], // Yến mạch chuối
  ]);

  const currentPlan = MEAL_PLANS_BY_GOAL[selectedGoal];

  // Tính tổng calo và macro đã nạp trong ngày
  const totalCaloriesConsumed = loggedFoods.reduce((acc, f) => acc + f.calories, 0);
  const totalProteinConsumed = loggedFoods.reduce((acc, f) => acc + f.protein, 0);
  const totalCarbsConsumed = loggedFoods.reduce((acc, f) => acc + f.carbs, 0);
  const totalFatConsumed = loggedFoods.reduce((acc, f) => acc + f.fat, 0);

  // Xử lý quét AI món ăn (Simulate AI Convolutional Vision Recognition)
  const runAiAnalysis = (foodItem: FoodNutritionItem, customUrl?: string) => {
    setAnalyzing(true);
    setAnalysisStep('1. Khởi tạo mạng nơ-ron tích chập AI Vision & trích xuất đặc trưng ảnh...');

    setTimeout(() => {
      setAnalysisStep('2. Nhận diện cấu trúc đĩa ăn, phân tách nguyên liệu & ước tính thể tích 3D...');
    }, 600);

    setTimeout(() => {
      setAnalysisStep('3. Truy vấn bảng thành phần thực phẩm Viện Dinh Dưỡng Quốc Gia (ViNutri DB)...');
    }, 1200);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisStep('');
      if (customUrl) {
        setCurrentScannedFood({
          ...foodItem,
          imageUrl: customUrl,
          detectedAt: new Date().toLocaleTimeString('vi-VN'),
        });
      } else {
        setCurrentScannedFood({
          ...foodItem,
          detectedAt: new Date().toLocaleTimeString('vi-VN'),
        });
      }
    }, 1800);
  };

  // Handle Upload or Photo Capture
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const resultUrl = uploadEvent.target?.result as string;
        setCustomImagePreview(resultUrl);

        // Tạo kết quả phân tích AI thực tế từ ảnh upload
        const customDish: FoodNutritionItem = {
          id: 'custom-' + Date.now(),
          foodName: 'Món Ăn Vừa Chụp (Ức Gà Xào Nấm & Đậu Hà Lan)',
          portionGrams: 350,
          calories: 430,
          protein: 42,
          carbs: 38,
          fat: 9,
          fiber: 6,
          sodium: 420,
          imageUrl: resultUrl,
          healthScore: 9.3,
          tags: ['Mới Tải Lên', 'AI Quét Trực Tiếp', 'Chuẩn Gym'],
          analysisNotes: 'Phát hiện thịt gia cầm nạc (khoảng 160g), nấm hương, đậu que và hạt bắp ngọt.',
          coachAdvice: 'Món ăn tự nấu rất sạch và cân bằng calo. Phù hợp cho bữa chính sau khi tập tạ.',
        };

        runAiAnalysis(customDish, resultUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Thêm món vào nhật ký ngày hôm nay
  const handleAddToDailyLog = (food: FoodNutritionItem) => {
    setLoggedFoods([food, ...loggedFoods]);
    alert(`Đã thêm món "${food.foodName}" (+${food.calories} kcal, +${food.protein}g đạm) vào Nhật Ký Dinh Dưỡng Hôm Nay!`);
  };

  // Xóa món khỏi nhật ký
  const handleRemoveFromLog = (index: number) => {
    setLoggedFoods(loggedFoods.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Navigation */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Trợ Lý Dinh Dưỡng Thông Minh & AI Vision</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Đề Xuất Dinh Dưỡng & AI Food Scanner
          </h2>
          <p className="text-xs text-slate-500">
            Chụp ảnh món ăn phân tích Macro chuẩn xác và nhận thực đơn 4 bữa cá nhân hóa theo mục tiêu.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('AI_SCANNER')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'AI_SCANNER'
                ? 'bg-city-red text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Chụp Ảnh Thức Ăn (AI)</span>
          </button>

          <button
            onClick={() => setActiveTab('MEAL_PLANNER')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'MEAL_PLANNER'
                ? 'bg-city-red text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Thực Đơn 4 Bữa</span>
          </button>

          <button
            onClick={() => setActiveTab('DAILY_LOG')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'DAILY_LOG'
                ? 'bg-city-red text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Nhật Ký Hôm Nay ({loggedFoods.length})</span>
          </button>
        </div>
      </div>

      {/* ==================== PHÂN HỆ 1: CHỤP ẢNH MÓN ĂN & AI VISION SCANNER ==================== */}
      {activeTab === 'AI_SCANNER' && (
        <div className="space-y-6">
          
          {/* Controls: Upload & Sample buttons */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-black text-slate-900 text-sm">Chụp Ảnh Hoặc Chọn Món Ăn Mẫu Để Quét AI:</h3>
                <p className="text-xs text-slate-500">Hỗ trợ nhận diện các món ăn Việt Nam và đồ ăn chuyên biệt cho Gymer.</p>
              </div>

              {/* Upload input button */}
              <label className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-bold text-xs shadow-md shadow-city-red/30 cursor-pointer flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Camera className="w-4 h-4" />
                <span>Chụp / Tải Ảnh Món Ăn Lên</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* 6 Sample 1-Click Dishes */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Hoặc Chọn Nhanh Món Ăn Tiêu Biểu Để Demo:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {SAMPLE_DISHES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => runAiAnalysis(d)}
                    className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 group hover:border-city-red ${
                      currentScannedFood?.id === d.id
                        ? 'border-city-red bg-red-50/50 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="w-full h-16 rounded-xl overflow-hidden bg-slate-200">
                      <img
                        src={d.imageUrl}
                        alt={d.foodName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[11px] text-slate-800 line-clamp-1">{d.foodName}</p>
                      <p className="text-[10px] text-city-red font-black mt-0.5">{d.calories} kcal</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Scanner Result Screen */}
          {analyzing ? (
            <div className="bg-slate-900 text-white p-12 rounded-3xl shadow-xl text-center space-y-4 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-city-red/20 text-city-red border border-city-red/30 flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-xl font-black">AI Vision Đang Quét Món Ăn...</h3>
              <p className="text-xs font-mono text-emerald-400 max-w-md mx-auto">{analysisStep}</p>
              
              {/* Laser Line Animation */}
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-city-red to-transparent mx-auto rounded-full animate-bounce mt-4" />
            </div>
          ) : currentScannedFood ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Image with AI Detection Bounding Badges */}
              <div className="lg:col-span-5 p-6 bg-slate-950 text-white flex flex-col justify-between space-y-4 relative">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      AI Vision Nhận Diện Thành Công
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Độ chuẩn xác: 98.4%</span>
                  </div>

                  <div className="relative mt-4 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                    <img
                      src={currentScannedFood.imageUrl}
                      alt={currentScannedFood.foodName}
                      className="w-full h-56 object-cover"
                    />
                    
                    {/* Floating Bounding Box Badges */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                      🎯 Khối lượng: ~{currentScannedFood.portionGrams}g
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-city-red text-white text-xs font-black shadow-lg">
                      {currentScannedFood.calories} kcal
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {currentScannedFood.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300 border border-white/10"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    "{currentScannedFood.analysisNotes}"
                  </p>
                </div>
              </div>

              {/* Right Column: Detailed Macro Breakdown */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div>
                  
                  {/* Dish Title & Health Score */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {currentScannedFood.foodName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Khẩu phần tiêu chuẩn: <strong>{currentScannedFood.portionGrams} grams</strong>
                      </p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="text-[9px] uppercase font-bold text-emerald-600 block">Điểm Dinh Dưỡng</span>
                        <strong className="text-base font-black text-emerald-800">{currentScannedFood.healthScore} / 10</strong>
                      </div>
                    </div>
                  </div>

                  {/* 4 Macro Cards with Progress Bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
                    
                    {/* Calories */}
                    <div className="p-3.5 rounded-2xl bg-red-50/80 border border-red-200">
                      <div className="flex items-center gap-1.5 text-city-red font-bold text-xs">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Năng Lượng</span>
                      </div>
                      <p className="text-xl font-black text-slate-900 mt-1">{currentScannedFood.calories}</p>
                      <span className="text-[10px] text-slate-500 font-semibold">kcal / đĩa</span>
                    </div>

                    {/* Protein */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200">
                      <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Đạm (Protein)</span>
                      </div>
                      <p className="text-xl font-black text-blue-900 mt-1">{currentScannedFood.protein}g</p>
                      <span className="text-[10px] text-slate-500 font-semibold">Tái tạo cơ bắp</span>
                    </div>

                    {/* Carbs */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                      <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Tinh Bột (Carbs)</span>
                      </div>
                      <p className="text-xl font-black text-amber-900 mt-1">{currentScannedFood.carbs}g</p>
                      <span className="text-[10px] text-slate-500 font-semibold">Năng lượng tập</span>
                    </div>

                    {/* Fat */}
                    <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200">
                      <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs">
                        <Droplets className="w-3.5 h-3.5" />
                        <span>Chất Béo (Fat)</span>
                      </div>
                      <p className="text-xl font-black text-purple-900 mt-1">{currentScannedFood.fat}g</p>
                      <span className="text-[10px] text-slate-500 font-semibold">Hấp thu vitamin</span>
                    </div>

                  </div>

                  {/* Secondary Micro-nutrients */}
                  <div className="flex items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-medium">
                    <span>🌾 Chất xơ: <strong className="text-slate-900">{currentScannedFood.fiber || 5}g</strong></span>
                    <span>🧂 Natri (Sodium): <strong className="text-slate-900">{currentScannedFood.sodium || 350}mg</strong></span>
                    <span>💧 Nước đề xuất: <strong className="text-slate-900">300ml sau ăn</strong></span>
                  </div>

                  {/* Coach / AI Advice Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="text-[11px] font-black uppercase text-emerald-800 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-emerald-600" />
                      Lời Khuyên Của Huấn Luyện Viên (AI Coach):
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentScannedFood.coachAdvice}
                    </p>
                  </div>

                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleAddToDailyLog(currentScannedFood)}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-bold text-xs shadow-lg shadow-city-red/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Thêm Vào Nhật Ký Dinh Dưỡng Hôm Nay (+{currentScannedFood.calories} kcal)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('MEAL_PLANNER')}
                    className="px-5 py-3.5 rounded-2xl border-2 border-slate-200 font-bold text-xs text-slate-700 hover:border-city-red hover:text-city-red transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Xem Thực Đơn 4 Bữa</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ) : null}

        </div>
      )}

      {/* ==================== PHÂN HỆ 2: ĐỀ XUẤT THỰC ĐƠN DINH DƯỠNG 4 BỮA ==================== */}
      {activeTab === 'MEAL_PLANNER' && (
        <div className="space-y-6">
          
          {/* Goal Selector Header */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-black uppercase text-city-red tracking-wider">Cá Nhân Hóa Thể Trạng</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Chọn Mục Tiêu Rèn Luyện Của Bạn:</h3>
                <p className="text-xs text-slate-500">
                  Hệ thống tự động cân chỉnh lượng Calo và tỷ lệ Đạm - Tinh bột - Chất béo theo chuẩn y khoa thể hình.
                </p>
              </div>

              {/* Goal Buttons */}
              <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                {[
                  { id: 'LOSE_FAT', label: 'Giảm Mỡ', icon: Flame, color: 'text-amber-500' },
                  { id: 'GAIN_MUSCLE', label: 'Tăng Cơ', icon: Zap, color: 'text-city-red' },
                  { id: 'MAINTAIN', label: 'Duy Trì', icon: Activity, color: 'text-emerald-500' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id as any)}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 border ${
                      selectedGoal === g.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <g.icon className={`w-3.5 h-3.5 ${g.color}`} />
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Macro Budget Targets */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
                <span className="text-[10px] font-bold text-city-red uppercase">Mục Tiêu Calo</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{currentPlan.targetCalories} kcal</p>
                <span className="text-[10px] text-slate-500">Mỗi ngày</span>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Protein Cần Nạp</span>
                <p className="text-xl font-black text-blue-900 mt-0.5">{currentPlan.targetProtein}g</p>
                <span className="text-[10px] text-slate-500">~2.2g / kg thể trọng</span>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Carbohydrate</span>
                <p className="text-xl font-black text-amber-900 mt-0.5">{currentPlan.targetCarbs}g</p>
                <span className="text-[10px] text-slate-500">Năng lượng tập</span>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <span className="text-[10px] font-bold text-purple-700 uppercase">Chất Béo Tốt</span>
                <p className="text-xl font-black text-purple-900 mt-0.5">{currentPlan.targetFat}g</p>
                <span className="text-[10px] text-slate-500">Nội tiết tố</span>
              </div>

              <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-cyan-700 uppercase flex items-center gap-1">
                  <Droplets className="w-3 h-3" /> Nước Uống
                </span>
                <p className="text-xl font-black text-cyan-900 mt-0.5">{currentPlan.waterIntakeLiters} Lít</p>
                <span className="text-[10px] text-slate-500">Thanh lọc độc tố</span>
              </div>
            </div>
          </div>

          {/* 4 Meals Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPlan.meals.map((meal, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-city-red transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-900 text-white">
                      BỮA {meal.mealType}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-city-red" />
                      {meal.timeSlot}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900">{meal.dishName}</h4>

                  {/* Ingredients */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nguyên Liệu Gợi Ý:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {meal.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                    <div className="p-1.5 bg-slate-50 rounded-xl">
                      <span className="text-[9px] text-slate-400 font-bold block">Calo</span>
                      <strong className="text-city-red font-black text-xs">{meal.calories}</strong>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-xl">
                      <span className="text-[9px] text-slate-400 font-bold block">Đạm</span>
                      <strong className="text-blue-700 font-black text-xs">{meal.protein}g</strong>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-xl">
                      <span className="text-[9px] text-slate-400 font-bold block">Carb</span>
                      <strong className="text-amber-700 font-black text-xs">{meal.carbs}g</strong>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-xl">
                      <span className="text-[9px] text-slate-400 font-bold block">Fat</span>
                      <strong className="text-purple-700 font-black text-xs">{meal.fat}g</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 bg-red-50/50 p-2.5 rounded-xl border border-red-100/80 italic">
                    💡 <strong>Lưu ý:</strong> {meal.tips}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==================== PHÂN HỆ 3: NHẬT KÝ ĂN UỐNG & THANH TIẾN ĐỘ CALO TRONG NGÀY ==================== */}
      {activeTab === 'DAILY_LOG' && (
        <div className="space-y-6">
          
          {/* Progress Tracker Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-black uppercase text-city-red tracking-wider">Tiến Độ Hôm Nay</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Đã Nạp: {totalCaloriesConsumed} / {currentPlan.targetCalories} kcal
                </h3>
                <p className="text-xs text-slate-500">
                  Còn lại: <strong className="text-emerald-600">{Math.max(0, currentPlan.targetCalories - totalCaloriesConsumed)} kcal</strong> để đạt chuẩn mục tiêu {selectedGoal === 'LOSE_FAT' ? 'Giảm mỡ' : selectedGoal === 'GAIN_MUSCLE' ? 'Tăng cơ' : 'Duy trì'}.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('AI_SCANNER')}
                className="px-4 py-2 rounded-xl bg-city-red text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Quét Thêm Món Ăn</span>
              </button>
            </div>

            {/* Calorie Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Năng Lượng Calo</span>
                <span>{Math.round((totalCaloriesConsumed / currentPlan.targetCalories) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-amber-500 to-city-red h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalCaloriesConsumed / currentPlan.targetCalories) * 100)}%` }}
                />
              </div>
            </div>

            {/* 3 Macro Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-blue-700">Protein: {totalProteinConsumed}g</span>
                  <span className="text-slate-400">Mục tiêu: {currentPlan.targetProtein}g</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (totalProteinConsumed / currentPlan.targetProtein) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-amber-700">Carbs: {totalCarbsConsumed}g</span>
                  <span className="text-slate-400">Mục tiêu: {currentPlan.targetCarbs}g</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (totalCarbsConsumed / currentPlan.targetCarbs) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-purple-700">Fat: {totalFatConsumed}g</span>
                  <span className="text-slate-400">Mục tiêu: {currentPlan.targetFat}g</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (totalFatConsumed / currentPlan.targetFat) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* List of Logged Dishes */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h4 className="font-black text-slate-900 text-sm">Các Món Ăn Đã Ghi Nhận Trong Ngày ({loggedFoods.length}):</h4>
              <span className="text-xs text-slate-400">Tự động đồng bộ với hồ sơ dinh dưỡng của HLV PT</span>
            </div>

            {loggedFoods.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Chưa có món ăn nào được lưu hôm nay. Hãy bấm "Chụp Ảnh Thức Ăn (AI)" để bắt đầu theo dõi!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {loggedFoods.map((f, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img src={f.imageUrl} alt={f.foodName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{f.foodName}</h5>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {f.portionGrams}g • Đạm: <strong className="text-blue-700">{f.protein}g</strong> • Carb: <strong className="text-amber-700">{f.carbs}g</strong> • Fat: <strong className="text-purple-700">{f.fat}g</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-black text-city-red text-base">+{f.calories} kcal</span>
                      <button
                        onClick={() => handleRemoveFromLog(idx)}
                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Xóa món này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

