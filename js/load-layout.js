window.addEventListener('load', async function () {
    await includeHTML();
    console.log('All HTML includes have been processed');
    document.body.style.display = 'flex';
});

function includeHTML() {
    return new Promise((resolve, reject) => {
        let elements = document.querySelectorAll('[data-include-html]');
        let root = document.querySelector('[data-root]').getAttribute('data-root');

        let promises = Array.from(elements).map(el => {
            return new Promise((innerResolve, innerReject) => {
                if (!el.hasAttribute('data-included')) {
                    let file = el.getAttribute('data-include-html');
                    if (file) {
                        fetch(file)
                            .then(response => {
                                if (response.ok) {
                                    return response.text();
                                }
                                throw new Error('Network response was not ok.');
                            })
                            .then(data => {
                                // Save the original content
                                let originalContent = el.innerHTML;

                                // Load the external HTML content
                                el.innerHTML = data;
                                el.setAttribute('data-included', 'true');

                                // Move the original content to the correct location
                                let contentElement = el.querySelector('#content');
                                if (contentElement) {
                                    contentElement.innerHTML = originalContent;
                                }

                                // Update all relative paths for links and images
                                let links = el.querySelectorAll('a');
                                links.forEach(link => {
                                    let href = link.getAttribute('href');
                                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                                        link.setAttribute('href', root + href);
                                    }
                                });

                                let images = el.querySelectorAll('img');
                                images.forEach(img => {
                                    let src = img.getAttribute('src');
                                    if (src && !src.startsWith('http')) {
                                        img.setAttribute('src', root + src);
                                    }
                                });

                                innerResolve();
                            })
                            .catch(error => {
                                console.error('Error fetching file:', error);
                                el.innerHTML = "Page not found.";
                                innerReject(error);
                            });
                    } else {
                        innerResolve();
                    }
                } else {
                    innerResolve();
                }
            });
        });

        Promise.all(promises)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}
