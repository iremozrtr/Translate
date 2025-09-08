const ApiKey = "dict.1.1.20250908T071941Z.f07a1d5b3dd177f1.63c4488a6a33109e3202937832b07e8366453488";
const input = document.getElementById("inputText");
const output = document.getElementById("outputText");

let timeout;
input.addEventListener("click", () => {

    if(input.innerText === "Buraya yaz...") input.innerText = "";
    input.setAttribute("contenteditable", "true");

});
input.addEventListener("input", () => {
    clearTimeout(timeout);
    const text = input.innerText.trim();
    if(text === "") {
        output.innerText = "Çeviri..";
        return;
    }

    timeout = setTimeout(() => {
        const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${ApiKey}&lang=en-ru&text=${text}`;

        axios.get(url)
            .then(response => {
                const data = response.data;

                if (data.def && data.def[0] && data.def[0].tr && data.def[0].tr[0]) {
                    output.innerText = data.def[0].tr[0].text;
                } else {
                    output.innerText = "Çeviri bulunamadı";
                }
            })
            .catch(err => {
                output.innerText = "Çeviri hatası!";
                console.error(err);
            });
    }, 500);
});

