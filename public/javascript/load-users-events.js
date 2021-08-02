async function eventLoader(event) {
    event.preventDefault();

    const user = req.session.user_id
  
 console.log(user)
    const response = await fetch(`/api/events/`, {
      method: 'GET',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  
  
  document.addEventListener('load', eventLoader);