let section = undefined;
function setupSection(domElement) {

    section = domElement;


}

async function getView() {
    return section;
}

let navMoviePage = {
    setupSection,
    getView
};

export default navMoviePage;