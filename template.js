function generateResultCardHTML(student, roll, displayClassName, subjectRows, totalMarksBangla, grandMaxMarks, grandTotalObtained, totalPercentage, finalGrade, schoolConfig) {
    return `
        <div class="result-card-item bg-white border-4 border-double border-teal-600 rounded-2xl p-6 shadow-xl mb-8">
            <div class="text-center border-b-2 border-teal-800/20 pb-4 mb-5">
                <h2 class="text-2xl font-black text-teal-900">${schoolConfig.school_name}</h2>
            </div>
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span class="text-slate-400">নাম:</span> <strong class="block">${student.name}</strong></div>
                <div><span class="text-slate-400">পিতার নাম:</span> <strong class="block">${student.father_name || 'N/A'}</strong></div>
                <div><span class="text-slate-400">জন্ম তারিখ:</span> <strong class="block">${student.dob || 'N/A'}</strong></div>
                <div><span class="text-slate-400">শ্রেণী:</span> <strong class="block">${displayClassName}</strong></div>
            </div>
            <table class="w-full text-center border-collapse text-sm">
                <thead><tr class="bg-slate-100"><th class="py-2">বিষয়</th><th>প্রাপ্ত নম্বর</th><th>গ্রেড</th></tr></thead>
                <tbody>${subjectRows}</tbody>
            </table>
            <div class="mt-4 font-bold text-center text-teal-800">মোট প্রাপ্ত: ${grandTotalObtained} | ফলাফল: ${finalGrade}</div>
        </div>
    `;
}
