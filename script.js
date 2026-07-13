async function checkResult() {
    const selectedClass = document.getElementById("classSelect").value;
    const roll = document.getElementById("rollInput").value.trim();
    const resultBox = document.getElementById("resultBox");
    const loading = document.getElementById("loading");

    if (!roll) {
        alert("দয়া করে একটি রোল নম্বর লিখুন!");
        return;
    }

    const searchKey = `${selectedClass}_${roll}`;

    resultBox.classList.add("hidden");
    loading.classList.remove("hidden");

    try {
        const response = await fetch('results.json');
        const data = await response.json();

        setTimeout(() => {
            loading.classList.add("hidden");

            if (data[searchKey]) {
                const student = data[searchKey];
                
                let subjectRows = "";
                for (const [subject, mark] of Object.entries(student.subjects)) {
                    subjectRows += `
                        <tr class="border-b border-slate-100">
                            <td class="py-2.5 text-slate-600 font-semibold">${subject}</td>
                            <td class="py-2.5 text-right font-bold text-teal-600">${mark}</td>
                        </tr>
                    `;
                }

                // এখানে প্রিন্ট বাটনটিকে 'print-btn' ক্লাসে রাখা হয়েছে যাতে প্রিন্ট করার সময় বাটনটি নিজে হাইড হয়ে যায়
                resultBox.innerHTML = `
                    <div class="bg-white border-2 border-teal-200 rounded-xl p-6 relative overflow-hidden shadow-xl">
                        <div class="absolute top-3 right-3 text-3xl print:hidden">🏆</div>
                        
                        <div class="text-center border-b border-dashed border-slate-200 pb-3 mb-4">
                            <h2 class="text-xl font-black text-slate-800 tracking-tight hidden print:block mb-1">সততা প্রি ক্যাডেট স্কুল</h2>
                            <p class="text-xs text-slate-500 uppercase font-bold tracking-widest hidden print:block mb-3">বার্ষিক পরীক্ষার রিপোর্ট কার্ড</p>
                            <h3 class="text-lg font-black text-teal-900">${student.name}</h3>
                            <p class="text-xs text-slate-500 font-medium mt-1">শ্রেণী: <strong>${selectedClass}</strong> | শাখা: <strong>${student.section}</strong> | রোল: <strong>${roll}</strong></p>
                        </div>
                        
                        <div class="mt-2">
                            <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">প্রাপ্ত নম্বর ও গ্রেড</h4>
                            <table class="w-full text-sm">
                                <tbody>
                                    ${subjectRows}
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-4 pt-3 border-t border-dashed border-teal-200">
                            <p class="text-xs text-slate-600 italic"><strong>शिक्षকের মন্তব্য:</strong> "${student.remarks}"</p>
                        </div>

                        <div class="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-3 hidden print:block text-right">
                            <div class="inline-block text-center">
                                <div class="w-32 border-b border-slate-400 h-8"></div>
                                <p class="text-[10px] text-slate-500 font-bold mt-1">প্রধান শিক্ষকের স্বাক্ষর</p>
                            </div>
                        </div>

                        <button onclick="window.print()" class="print-btn w-full mt-5 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-md">
                            <i class="fa-solid fa-print"></i> রিপোর্ট কার্ড প্রিন্ট করুন
                        </button>
                    </div>
                `;
            } else {
                resultBox.innerHTML = `
                    <div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 text-center shadow-md">
                        <span class="text-3xl block mb-2">🤔</span>
                        <h3 class="text-sm font-bold text-amber-800">ফলাফল পাওয়া যায়নি!</h3>
                        <p class="text-xs text-slate-500 mt-1">এই রোল বা শ্রেণীর ফলাফল এখনো আপলোড করা হয়নি।</p>
                    </div>
                `;
            }

            resultBox.classList.remove("hidden");
        }, 800);

    } catch (error) {
        loading.classList.add("hidden");
        alert("ডাটাবেজ ফাইল লোড করা যায়নি।");
        console.error(error);
    }
}
