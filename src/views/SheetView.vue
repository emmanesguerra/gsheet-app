<script setup>
import { ref, onMounted } from "vue";

const rows = ref([]);
const loading = ref(true);

function loadJSONP(url, callbackName) {
    return new Promise((resolve) => {
        window[callbackName] = (data) => {
            resolve(data);
        };

        const script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
    });
}

onMounted(async () => {
    const url =
        "https://script.google.com/macros/s/AKfycbwoloUpnSmCiZtjgDpO-maLM06K_kZEgutDk1qrZAeGmE72rkmK0r0P0A02O3fxX8xs/exec?callback=sheetCallback";

    const data = await loadJSONP(url, "sheetCallback");
    console.log(data);
    rows.value = data.rows;
    loading.value = false;
});

function getRowColor(i) {
    // Define your row groups: 4, 2, 3, 2, 3, 6
    const groups = [4, 2, 3, 2, 3, 6];
    let sum = 0;

    for (let g = 0; g < groups.length; g++) {
        sum += groups[g];
        if (i < sum) {
            switch (g) {
                case 0: return 'bg-red-100';
                case 1: return 'bg-yellow-100';
                case 2: return 'bg-green-100';
                case 3: return 'bg-blue-100';
                case 4: return 'bg-purple-100';
                case 5: return 'bg-pink-100';
            }
        }
    }

    return ''; // default
}
</script>

<template>
    <div class="p-0">
        <div v-if="loading" class="text-gray-500">Loading...</div>

        <div class="overflow-auto relative">
            <table class="min-w-full border border-gray-300 rounded-lg">
                <thead class="bg-gray-100">
                    <tr>
                        <th v-for="(col, i) in rows[0]" :key="i"
                            class="text-sm px-4 py-2 border-b text-left font-bold text-white whitespace-nowrap bg-gray-700 sticky top-0 z-20"
                            :class="{
                                'sticky left-0 z-30': i === 0,
                                'sticky left-34 z-30': i === 1
                            }">
                            {{ col }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(row, index) in rows.slice(1)" :key="index" :class="[
                        'transition-colors duration-150 text-sm text-center',
                        getRowColor(index)
                    ]">
                        <td v-for="(col, j) in row" :key="j" class="px-4 py-2 border-b text-gray-800" :class="{
                            'font-bold sticky left-0 z-10 bg-white text-right': j === 0,
                            'font-bold sticky left-34 z-10 bg-white': j === 1,
                            'font-bold': j >= row.length - 3
                        }">
                            {{ col }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
