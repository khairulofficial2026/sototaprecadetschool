function generateResultCardHTML(student, roll, displayClassName, subjectRows, totalMarksBangla, grandMaxMarks, grandTotalObtained, totalPercentage, finalGrade, schoolConfig) {
    
    const formattedDate = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });

    return `
        <div class="bg-white border-4 border-double border-teal-600 rounded-2xl p-6 md:p-8 relative shadow-2xl">
            
            <!-- স্কুল হেডার -->
            <div class="text-center border-b-2 border-teal-800/20 pb-4 mb-5">
                <h2 class="text-3xl font-black text-teal-900" style="font-family: 'Tiro Bangla', serif;">${schoolConfig.school_name}</h2>
                <p class="text-xs text-slate-500 font-bold tracking-widest mt-1">
                    ${schoolConfig.address || 'ঠিকানা'} | স্থাপিত: ${schoolConfig.established}
                </p>
            </div>
            
            <!-- স্টুডেন্ট ইনফো বক্স -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><span class="text-slate-400 font-medium">নাম:</span> <strong class="block text-slate-900">${student.name}</strong></div>
                <div><span class="text-slate-400 font-medium">পিতার নাম:</span> <strong class="block text-slate-900">${student.father_name || 'N/A'}</strong></div>
                <div><span class="text-slate-400 font-medium">জন্ম তারিখ:</span> <strong class="block text-slate-900">${student.dob || 'N/A'}</strong></div>
                <div><span class="text-slate-400 font-medium">শ্রেণী:</span> <strong class="block text-slate-900">${displayClassName}</strong></div>
                <div><span class="text-slate-400 font-medium">রোল নং:</span> <strong class="block text-slate-900">${roll}</strong></div>
            </div>
            
            <!-- রেজাল্ট টেবিল -->
            <div class="overflow-hidden border border-slate-200 rounded-xl mb-6">
                <table class="w-full text-center text-xs md:text-sm">
                    <tr class="bg-slate-100 font-bold text-slate-700 uppercase">
                        <th class="py-3 px-4 text-left">Subject</th><th>Max</th><th>Obtained</th><th>Grade</th>
                    </tr>
                    ${subjectRows}
                </table>
            </div>

            <!-- মন্তব্যের ঘর -->
            <div class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p class="text-xs text-slate-600 font-bold uppercase mb-1">শিক্ষকের মন্তব্য (Remarks):</p>
                <p class="text-sm font-semibold italic text-slate-800">"${student.remarks || 'নিয়মিত পড়াশোনা প্রয়োজন।'}"</p>
            </div>

            <!-- গ্রেড ডিস্ট্রিবিউশন -->
            <div class="mb-8">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase mb-2">Grading System</h3>
                <div class="grid grid-cols-5 gap-1 text-[9px] text-center bg-slate-50 p-2 rounded-lg border">
                    <div>80-100: <span class="font-bold">A+</span></div>
                    <div>70-79: <span class="font-bold">A</span></div>
                    <div>60-69: <span class="font-bold">A-</span></div>
                    <div>50-59: <span class="font-bold">B</span></div>
                    <div>33-49: <span class="font-bold">D</span></div>
                </div>
            </div>
            
            <!-- সিগনেচার সেকশন (আপডেট করা) -->
            <div class="grid grid-cols-3 gap-4 mt-12 mb-6 text-center">
                <div><div class="border-t border-slate-400 w-full pt-1 text-[10px] font-bold">অভিভাবকের স্বাক্ষর</div></div>
                <div><div class="border-t border-slate-400 w-full pt-1 text-[10px] font-bold">শ্রেণী শিক্ষকের স্বাক্ষর</div></div>
                <div><div class="border-t border-teal-700 w-full pt-1 text-[10px] font-bold text-teal-800">প্রধান শিক্ষকের স্বাক্ষর</div></div>
            </div>

            <!-- ফুটারে টাইমস্ট্যাম্প -->
            <div class="pt-4 border-t border-dashed flex justify-between text-[10px] text-slate-400">
                <p>ইস্যুর সময়: ${formattedDate} | ${formattedTime}</p>
            </div>
            
            <button onclick="window.print()" class="print-btn w-full mt-5 bg-teal-700 text-white font-bold py-3 rounded-xl hover:bg-teal-800 transition">রিপোর্ট কার্ড প্রিন্ট করুন</button>
        </div>
    `;
}
