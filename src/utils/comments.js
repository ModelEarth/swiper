// // Set the hash to 1 on page load or reload
// useEffect(() => {
//   window.location.hash = '#feed=nasa&scene=1';
//   setActiveIndex(1);  // Set activeIndex to 1 on initial load or reload
// }, []);

// if (!feed || isNaN(scene) || scene < 1 || scene > 9) {
//   window.history.replaceState(null, null, '#feed=nasa&scene=1');
// } else {
//   console.log(`Setting activeIndex to ${scene}`);
//   window.history.replaceState(null, null, '#feed=nasa&scene=1');
// }

// initialSlide={0} //Set initialSlide = {5} if you want to show swiper in the middle slide by default

// Send message to parent window with activeIndex
// window.parent.postMessage({ activeIndex: index, source: 'swiper' }, '*');

// const mediaUpdateEvent = new CustomEvent('mediaUpdate', {
//     detail: {
//       url: url || "url not found",
//       title: title || "title not found",
//       explanation: explanation || "explanation not found",
//     }
//   });
//   window.dispatchEvent(mediaUpdateEvent);

// const [mediaDetails, setMediaDetails] = useState({
//     url: '',
//     title: '',
//     explanation: '',
//   });
// useEffect(() => {
//     const handleMediaUpdate = (event) => {
//         // Verify that we received valid data
//         if (event.detail) {
//             setMediaDetails(event.detail);
//             console.log('Received media update:', event.detail);
//             // Pause current playback
//             if (isPlaying) {
//                 pause();
//             }
//         }
//     };
//     // Listen for the custom event instead of message event
//     window.addEventListener('mediaUpdate', handleMediaUpdate);
//     return () => window.removeEventListener('mediaUpdate', handleMediaUpdate);
// }, []);

// // Handle external media updates
// useEffect(() => {
//     if (mediaDetails) {
//         // Update current media with the external data
//         setCurrentMedia(mediaDetails);
//         setMediaDetails({
//             url: '',
//             title: '',
//             explanation: '',
//         });
//         // Reset playback state
//         setCurrentTimeSec(0);
//         setCurrentTime([0, 0]);
//         setImageElapsed(0);
//         setIsPlaying(false);
//         // If autoplay is enabled, start playing the new media
//         if (autoplay) {
//             play();
//         }
//     }
// }, [mediaDetails, autoplay]);

// // Dispatch custom event with data
// window.dispatchEvent(new CustomEvent('passData', { detail: { url, title, explanation  }}));

// const user = 'RaydenDarkus';
// const repo = 'feed';
// const filePath = 'data/swiper-data.json'
// const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
// const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${user}/${repo}/main/${filePath}`;
// const GITHUB_API_URL = `https://api.github.com/repos/${user}/${repo}/contents/data/${filePath}`;

// async function updateGitHubFile(content) {
//   try {
//     const getFileResponse = await fetch(GITHUB_API_URL, {
//         headers: {
//           'Authorization': `token ${GITHUB_TOKEN}`,
//           'Accept': 'application/vnd.github.v3+json'
//         }
//     });
//     if (!getFileResponse.ok) {
//         throw new Error('Failed to fetch file info');
//     }
//     const fileData = await getFileResponse.json();
//     console.log(fileData);
//     // Update the file
//     const updateResponse = await fetch(GITHUB_API_URL, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `token ${GITHUB_TOKEN}`,
//           'Accept': 'application/vnd.github.v3+json'
//         },
//         body: JSON.stringify({
//           message: 'Update swiper data',
//           content: btoa(JSON.stringify(content, null, 2)),
//           sha: fileData.sha,
//           branch: 'main'
//         })
//     });
//     if (!updateResponse.ok) {
//         throw new Error('Failed to update file');
//     }
//     console.log('GitHub file updated successfully');
//   } catch (error) {
//     console.error('Error updating GitHub file:', error);
//   }
// }

// fetch(GITHUB_RAW_URL)
// .then(response => response.json())
// .then(currentContent => {
//     const newEntry = {
//       id: currentContent.length + 1,
//       url,
//       title,
//       explanation,
//       timestamp: new Date().toISOString()
//     };
//     updateGitHubFile([...currentContent, newEntry]);
// })
// .catch(error => {
//     console.error("Cannot create entry.");
// });

//   // Function to clear GitHub file on page unload
//   function clearGitHubFile() {
//     updateGitHubFile([]);
//   }

// window.addEventListener("unload", clearGitHubFile);
// window.removeEventListener("unload", clearGitHubFile);

//   {lightboxImage && (
//     <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
//       {lightboxMediaType === "video" ? (
//         <iframe className={styles.lightboxImg} src={lightboxImage} alt="Enlarged Video" allowFullScreen />
//       ) : (
//         <img className={styles.lightboxImg} src={lightboxImage} alt="Enlarged Image" />
//       )}
//     </div>
//   )
