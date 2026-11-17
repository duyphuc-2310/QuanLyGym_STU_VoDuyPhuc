import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, Flame, 
  Calendar, Download, ArrowUpRight, Award, Zap, CheckCircle2
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('month');

  const hourlyData = [
    { hour: '06:00', count: 42, percent: 45 },
    { hour: '07:00', count: 68, percent: 70 },
    { hour: '09:00', count: 28, percent: 30 },
    { hour: '11:30', count: 35, percent: 38 },
    { hour: '15:00', count: 32, percent: 35 },
    { hour: '17:00', count: 88, percent: 90, isPeak: true },
    { hour: '18:00', count: 98, percent: 100, isPeak: true },
    { hour: '19:00', count: 92, percent: 94, isPeak: true },
    { hour: '20:15', count: 64, percent: 66 },
    { hour: '21:30', count: 22, percent: 24 },
  ];

  const trainersPerformance = [
    { name: 'Nguyễn Minh Tuấn', sessions: 68, rating: 4.9, commission: 10200000, leadsConverted: 8 },
    { name: 'Trần Hoàng Yến', sessions: 54, rating: 4.8, commission: 8100000, leadsConverted: 12 },
    { name: 'Lê Văn Hùng', sessions: 42, rating: 4.7, commission: 6300000, leadsConverted: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Phân Hệ Quản Trị & Báo Cáo BI (Business Intelligence)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Báo Cáo Phân Tích Dữ Liệu & Hiệu Suất Vận Hành
          </h1>
          <p className="text-xs text-slate-500">
            Thống kê doanh thu, lưu lượng khung giờ cao điểm và đánh giá hiệu suất đội ngũ HLV CITYGYM.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['today', 'week', 'month'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === 'today' ? 'Hôm Nay' : r === 'week' ? 'Tuần Này' : 'Tháng Này'}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Xuất báo cáo BI định dạng Excel/PDF (STU Biểu mẫu 04)!')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Hội Viên Hoạt Động</span>
            <Users className="w-4 h-4 text-city-red" />
          </div>
          <p className="text-3xl font-black text-slate-900">1.248</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.4% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Check-in Hôm Nay</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-city-red">312</p>
          <p className="text-[11px] text-slate-500 font-medium">Khung cao điểm: 17h30 - 19h30</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Doanh Thu Tháng Này</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-600">428.5M</p>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">
            Đạt 107% Kế hoạch STU
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Chuyển Đổi Lead Landing</span>
            <Flame className="w-4 h-4 text-city-red" />
          </div>
          <p className="text-3xl font-black text-amber-500">38.5%</p>
          <p className="text-[11px] text-slate-500 font-medium">Tập thử 03 ngày $\rightarrow$ Mua gói VIP</p>
        </div>

      </div>

      {/* Peak Hours Heatmap Chart */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-black text-slate-900 text-base">
              Biểu Đồ Nhiệt Khung Giờ Cao Điểm (Peak Hours Heatmap)
            </h3>
            <p className="text-xs text-slate-500">
              Phân bổ số lượt check-in qua cổng Turnstile trong từng khung giờ trong ngày.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span>Bình thường</span>
            </span>
            <span className="flex items-center gap-1.5 text-city-red font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-city-red shadow-sm shadow-city-red" />
              <span>Cao điểm (&gt;85% công suất)</span>
            </span>
          </div>
        </div>

        {/* Heatmap Columns */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 pt-4 text-center text-xs">
          {hourlyData.map((d) => (
            <div key={d.hour} className="space-y-2">
              <div className="h-40 bg-slate-100 rounded-2xl flex items-end p-1.5 shadow-inner">
                <div
                  style={{ height: `${d.percent}%` }}
                  className={`w-full rounded-xl transition-all duration-500 relative group flex items-start justify-center pt-1 ${
                    d.isPeak
                      ? 'bg-gradient-to-t from-city-darkred to-city-red shadow-md shadow-city-red/30'
                      : 'bg-slate-400 hover:bg-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </span>
                </div>
              </div>
              <p className="font-black text-slate-800 text-[11px]">{d.hour}</p>
              <p className="text-[10px] text-slate-400 font-mono">{d.count} lượt</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Performance & Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trainer Commission Table */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-black text-slate-900 text-base">Hiệu Suất & Hoa Hồng Huấn Luyện Viên (PT)</h3>
              <p className="text-xs text-slate-500">Tự động tổng hợp từ số buổi tập đã xác nhận hoàn thành.</p>
            </div>
            <Award className="w-5 h-5 text-amber-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Huấn Luyện Viên</th>
                  <th className="p-3 text-center">Buổi Dạy</th>
                  <th className="p-3 text-center">Đánh Giá</th>
                  <th className="p-3 text-center">Chốt Lead</th>
                  <th className="p-3 text-right">Tổng Hoa Hồng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {trainersPerformance.map((t, idx) => (
                  <tr key={t.name} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{t.name}</span>
                    </td>
                    <td className="p-3 text-center font-bold">{t.sessions} buổi</td>
                    <td className="p-3 text-center text-amber-500 font-bold">★ {t.rating}</td>
                    <td className="p-3 text-center font-semibold text-emerald-600">+{t.leadsConverted} hội viên</td>
                    <td className="p-3 text-right font-black text-city-red text-sm">
                      {t.commission.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Package Revenue Share */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-base">Cơ Cấu Doanh Thu Gói</h3>
          <p className="text-xs text-slate-500">Tỷ trọng đóng góp vào tổng doanh thu tháng.</p>

          <div className="space-y-4 pt-2">
            {[
              { name: 'CityVIP 12 Tháng', percent: 62, revenue: '265.6M', color: 'bg-city-red' },
              { name: 'CityPro 6 Tháng', percent: 26, revenue: '111.4M', color: 'bg-amber-500' },
              { name: 'CityBasic 1 Tháng', percent: 12, revenue: '51.5M', color: 'bg-slate-500' },
            ].map((pkg) => (
              <div key={pkg.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-800">{pkg.name}</span>
                  <span className="text-slate-900 font-black">{pkg.revenue} ({pkg.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${pkg.percent}%` }}
                    className={`h-full rounded-full ${pkg.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            <p>💡 Gói CityVIP 12 tháng chiếm 62% doanh thu nhờ chính sách tặng 20 buổi PT 1-1 và hạn mức bảo lưu 60 ngày.</p>
          </div>
        </div>

      </div>

    </div>
  );
};

