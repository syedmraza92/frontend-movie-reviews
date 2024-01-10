import React, { useState } from "react";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  const addToFavorites = (movie) => {
    setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    setShowFavoriteModal(true);

    // Close the message after 3 seconds
    setTimeout(() => {
      setShowFavoriteModal(false);
    }, 3000);
  };

  const handleCloseFavoriteModal = () => setShowFavoriteModal(false);

  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h1>{movie.title}</h1>
                    </div>
                    <div className="movie-buttons-container">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>

                      <div
                        className="movie-review-button-container"
                        style={{ padding: "10px 0" }}
                      >
                        <Button
                          variant="info"
                          onClick={() => reviews(movie.imdbId)}
                        >
                          Reviews
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => addToFavorites(movie)}
                          style={{ marginTop: "10px" }}
                        >
                          <FontAwesomeIcon icon={faHeart} /> Favorite
                        </Button>
                        <Modal
                          show={showFavoriteModal}
                          onHide={() => setShowFavoriteModal(false)}
                          centered
                        >
                          <Modal.Body>
                            <p style={{ color: "black", fontWeight: 'bold'}}>
                              Movie has been favorited!
                            </p>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
