// 📄 মার্কশিটের কম্প্যাক্ট ডিজাইন লেআউট (লাইভ ডেট-টাইম একদম নিচে সহ)
function generateResultCardHTML(student, roll, displayClassName, subjectRows, totalMarksBangla, grandMaxMarks, grandTotalObtained, totalPercentage, finalGrade, schoolConfig) {
    
    // ⏰ বর্তমান লাইভ তারিখ ও সময় জেনারেট করার কোড
    const currentDateTime = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    
    const formattedDate = currentDateTime.toLocaleDateString('bn-BD', optionsDate); // বাংলা তারিখ
    const formattedTime = currentDateTime.toLocaleTimeString('bn-BD', optionsTime); // বাংলা সময়

    return `
        <div class="bg-white border-4 border-double border-teal-600 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            
            <!-- প্রফেশনাল স্ট্যাম্প লেআউট -->
            <div class="stamp-box absolute right-6 top-32 md:right-8 md:top-28 border-4 border-dashed border-emerald-500/40 text-emerald-600/50 font-black text-center px-4 py-1.5 rounded-xl tracking-wider uppercase transform rotate-12 select-none z-0">
                <span class="text-xs font-bold block">RESULT</span>
                <span class="text-sm md:text-base tracking-widest">${student.status || 'PROMOTED'}</span>
            </div>

            <!-- হেডারে স্কুলের নাম, ঠিকানা ও ইমেইল সেকশন -->
            <div class="text-center border-b-2 border-teal-800/20 pb-4 mb-5">
                <h2 class="text-2xl font-black text-teal-900" style="font-family: 'Tiro Bangla', serif;">${schoolConfig.school_name}</h2>
                <div class="text-[11px] text-slate-500 font-bold tracking-wide mt-1 space-y-0.5">
                    <p>📍 ${schoolConfig.address || ''} | ✉️ ${schoolConfig.email || ''}</p>
                    <p class="uppercase text-[10px] text-slate-400 mt-1">স্থাপিত: ${schoolConfig.established} | ${schoolConfig.report_card_title}</p>
                </div>
            </div>
            
            <!-- স্টুডেন্ট ইনফো বক্স -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span class="text-slate-400 font-medium">নাম (Name):</span> <strong class="text-teal-950 font-bold block md:inline">${student.name}</strong></div>
                <div><span class="text-slate-400 font-medium">শ্রেণী (Class):</span> <strong class="text-slate-800 font-bold block md:inline">${displayClassName}</strong></div>
                <div><span class="text-slate-400 font-medium">রোল (Roll No):</span> <strong class="text-slate-800 font-bold block md:inline">${roll}</strong></div>
            </div>
            
            <!-- ৫ কলামের আন্তর্জাতিক স্ট্যান্ডার্ড টেবিল -->
            <div class="overflow-hidden border border-slate-200 rounded-xl shadow-sm z-10 relative bg-white">
                <table class="w-full border-collapse text-xs md:text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 text-center font-bold">
                            <th class="py-3 px-4 text-left font-bold text-slate-600">SUBJECT</th>
                            <th class="py-3 px-2 text-slate-600">MAX MARKS</th>
                            <th class="py-3 px-2 text-slate-600">OBTAINED</th>
                            <th class="py-3 px-2 text-slate-600">PERCENTAGE</th>
                            <th class="py-3 px-2 text-slate-600">GRADE</th>
                            <th class="py-3 px-2 text-slate-600">RESULT</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjectRows}
                        <!-- গ্র্যান্ড টোটাল রো -->
                        <tr class="bg-teal-50/50 font-black border-t border-teal-200 text-center text-sm md:text-base text-teal-900">
                            <td class="py-3 px-4 text-left font-bold text-xs uppercase tracking-wider">GRAND TOTAL:</td>
                            <td class="py-3 px-2 font-medium text-slate-500 text-sm">${grandMaxMarks}</td>
                            <td class="py-3 px-2 text-teal-800">${grandTotalObtained} <span class="text-xs text-slate-400 font-normal">(${totalMarksBangla})</span></td>
                            <td class="py-3 px-2 font-bold text-sm text-slate-700">${totalPercentage}%</td>
                            <td class="py-3 px-2 font-bold text-emerald-700">${finalGrade}</td>
                            <td class="py-3 px-2 text-xs font-bold tracking-wider text-teal-700">${student.status || 'PROMOTED'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="mt-4 p-3.5 bg-amber-50/40 border border-amber-200 rounded-xl">
                <p class="text-xs text-slate-600"><strong>মন্তব্য (Remarks):</strong> <span class="italic text-slate-700 font-semibold">"${student.remarks}"</span></p>
            </div>
            
            <!-- সিগনেচার সেকশন -->
            <div class="mt-14 hidden print:flex justify-between text-center px-4">
                <div><div class="w-24 md:w-28 border-b border-slate-400 h-5"></div><p class="text-[10px] text-slate-500 font-bold mt-1">অভিভাবকের স্বাক্ষর</p></div>
                <div><div class="w-24 md:w-28 border-b border-slate-400 h-5"></div><p class="text-[10px] text-slate-500 font-bold mt-1">শ্রেণী শিক্ষকের স্বাক্ষর</p></div>
                <div><div class="w-24 md:w-28 border-b border-teal-700 h-5"></div><p class="text-[10px] text-teal-900 font-bold mt-1">প্রধান শিক্ষকের স্বাক্ষর</p></div>
            </div>

            <!-- 🗓️ লাইভ ডেট ও টাইম প্রিন্ট সেকশন (একদম নিচে আলাদা ফুটার নোট হিসেবে) -->
            <div class="mt-8 pt-2 border-t border-dashed border-slate-200 flex justify-between items-center text-[10px] font-medium text-slate-400">
                <p><i class="fa-solid fa-calendar-day"></i> এই রিপোর্ট কার্ডটি ডিজিটালভাবে তৈরি করা হয়েছে।</p>
                <p>ইস্যুর তারিখ ও সময়: <span class="text-slate-500 font-bold">${formattedDate} | ${formattedTime}</span></p>
            </div>
            
            <button onclick="window.print()" class="print-btn w-full mt-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold py-3 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition hover:opacity-95"><i class="fa-solid fa-print"></i> এই প্রিমিয়াম রিপোর্ট কার্ডটি প্রিন্ট করুন</button>
        </div>
    `;
}
