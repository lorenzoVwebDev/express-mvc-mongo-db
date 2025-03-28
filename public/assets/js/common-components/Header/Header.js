import { url } from '../../utils/globalVariables.js'

let Headers =  `
      <header class="p-3 text-bg-dark">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
          </a>
          
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="${url}" class="nav-link px-2 text-white">Home</a></li>
            <li><a href="${url}authentication/view/dashboard" class="nav-link px-2 text-white">Admin Dashboard</a></li>
          </ul>

          <div class="text-end" id="left-side-header">
            <button type="button" class="btn btn-outline-light me-2"><a href="${url}authentication/authentication/signin">Login</a></button>
            <button type="button" class="btn btn-warning"><a href="${url}authentication/authentication/signup">Sign-up</a></button>
          </div>
          <div id="left-side-header-log-out">
            <button type="button" class="btn btn-warning" id="log-out-button">Log Out</button>
          </div>
        </div>
      </div>
    </header>
`; 

export default Headers;
