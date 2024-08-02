function Footer() {
  return (
    <footer className="bg-[#042542] text-white">
      <nav className="flex justify-center items-end p-10">
        <div className="flex items-end flex-col m-2 mr-5">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="The Movie Database (TMDB)"
            width="130"
            height="94"
          />
          <a
            className="block my-2 mt-10 w-full py-2 px-5 font-extrabold tracking-tight rounded-sm bg-white text-blue-700"
            href="#"
          >
            Join the Community
          </a>
        </div>

        <div className="flex items-start">
          <div className="m-4">
            <h3 className="text-2xl font-bold">The Basics</h3>
            <ul>
              <li>
                <a href="#">About TMDB</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Support Forums</a>
              </li>
              <li>
                <a href="https://developer.themoviedb.org/docs" target="_blank">
                  API
                </a>
              </li>
              <li>
                <a href="https://status.themoviedb.org/" target="_blank" rel="noopener">
                  System Status
                </a>
              </li>
            </ul>
          </div>
          <div className="m-4">
            <h3 className="text-2xl font-bold">Get Involved</h3>
            <ul>
              <li>
                <a href="#">
                  <span className="glyphicons glyphicons-asterisk"></span> Contribution Bible
                </a>
              </li>
              <li>
                <a href="#">Add New Movie</a>
              </li>
              <li>
                <a href="#">Add New TV Show</a>
              </li>
            </ul>
          </div>
          <div className="m-4">
            <h3 className="text-2xl font-bold">Community</h3>
            <ul>
              <li>
                <a href="#">Guidelines</a>
              </li>
              <li>
                <a href="#">Discussions</a>
              </li>
              <li>
                <a href="#">Leaderboard</a>
              </li>
            </ul>
          </div>
          <div className="m-4">
            <h3 className="text-2xl font-bold">Legal</h3>
            <ul>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">API Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">DMCA Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
