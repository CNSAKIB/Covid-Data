// Enter key setting 
var input = document.getElementById("input-feild");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});
// Enter Key Ends 


const callInfo = () => {
    document.getElementById('initial-display').style.display = 'none';
    const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    inputFeild.value = ''
    if (inputValue == '') {
        const searchResult = document.getElementById('search-result');
        searchResult.innerText = '';
        document.getElementById('empty-box').style.display = 'block';
    }
    else {
        document.getElementById('empty-box').style.display = 'none';
        // console.log(inputValue);
        const url = `https://api.covid19api.com/total/country/${inputValue}
    `;

        fetch(url)
            .then(res => res.json())
            .then(data => displayInfo(data[data.length - 1]))
            .catch(error => displayError(error));
        document.getElementById('spinner-display').style.display = 'block'

    }

    const displayError = error => {
        document.getElementById('wrong-type').style.display = 'block';
    }

}

const displayInfo = data => {

    const searchResult = document.getElementById('search-result');
    searchResult.innerText = '';
    document.getElementById('spinner-display').style.display = 'none';
    document.getElementById('wrong-type').style.display = 'none';


    // console.log(data);
    // displaying data
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
            <h2 class="mb-3">${data.Country}</h2>
        <table class="table text-white">
            <tbody>
                <tr class="bg-secondary">
                    <th scope="row">Active Cases</th>
                    <td>${data.Active}</td>
                </tr>
                <tr class="bg-success">
                    <th scope="row">Confirmed Cases</th>
                    <td colspan="2">${data.Confirmed}</td>
                </tr>
                <tr class="bg-danger">
                    <th scope="row">Total Deaths</th>
                    <td>${data.Deaths}</td>
                </tr>
                <tr class="bg-info">
                    <th scope="row">Last Updated</th>
                    <td>${data.Date}</td>
                </tr>
                
            </tbody>
        </table>`;
    searchResult.appendChild(div);



}