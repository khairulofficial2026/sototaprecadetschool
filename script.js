async function checkResult() {
    const selectedClass = document.getElementById("classSelect").value;
    const roll = document.getElementById("rollInput").value.trim();
    const resultBox = document.getElementById("resultBox");
    const loading = document.getElementById("loading");

    if (!roll) {
        alert("দয়া করে একটি রোল নম্বর লিখুন!");
        return;
    }

    // ডাটা কি (Key) তৈরি করা
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
                
                // বিষয়ভিত্তিক মার্কস টেবিল জেনারেট করা
                let subjectRows = "";
                for (const [subject, mark] of Object.entries(student.subjects)) {
                    subjectRows += `
                        <tr class="border-b border-slate-100">
                            <td class="py-2 text-slate-600 font-semibold">${subject}</td>
                            <td class="py-2 text-right font-bold text-teal-600">${mark}</td>
                        </tr>
                    `;
                }

                resultBox.innerHTML = `
                    <div class="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-xl p-5 relative overflow-hidden">
                        <div class="absolute top-2 right-2 text-3xl">🏆</div>
                        <h3 class="text-lg font-black text-teal-900">${student.name}</h3>
                        <p class="text-xs text-slate-500 font-medium">শ্রেণী: <strong>${selectedClass}</strong> | শাখা: <strong>${student.section}</strong> | রোল: <strong>${roll}</strong></p>
                        
                        <div class="mt-4">
                            <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">প্রাপ্ত নম্বর ও গ্রেড</h4>
                            <table class="w-full text-sm">
                                <tbody>
                                    ${subjectRows}
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-4 pt-3 border-t border-dashed border-teal-200">
                            <p class="text-xs text-slate-600 italic"><strong>शिक्षকের মন্তব্য:</strong> "${student.remarks}"</p>
                        </div>

                        <button onclick="window.print()" class="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1 shadow-sm">
                            <i class="fa-solid fa-print"></i> রিপোর্ট কার্ড প্রিন্ট করুন
                        </button>
                    </div>
                `;
            } else {
                resultBox.innerHTML = `
                    <div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 text-center">
                        <span class="text-3xl block mb-2">🤔</span>
                        <h3 class="text-sm font-bold text-amber-800">ফলাফল পাওয়া যায়নি!</h3>
                        <p class="text-xs text-slate-500 mt-1">এই রোল বা শ্রেণীর ফলাফল এখনো আপলোড করা হয়নি। টেস্ট করার জন্য Play Group এর রোল 1 অথবা Class 5 এর রোল 1 দিন।</p>
                    </div>
                `;
            }

            resultBox.classList.remove("hidden");
        }, 1000);

    } catch (error) {
        loading.classList.add("hidden");
        alert("ডাটাবেজ ফাইল লোড করা যায়নি। results.json ফাইলটি ঠিক আছে কিনা চেক করুন!");
        console.error(error);
    }
}
