import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { remoteImg } from '../App';
import iconSvg from '../img/icons.svg';
import whiteLogo from '../img/logo-white.png';
import { Tour } from './Overview';

type ReviewUser = {
  _id: string;
  name: string;
  photo: string;
};

type Review = {
  id: string;
  review: string;
  rating: number;
  createdAt: string;
  tour: string;
  user: ReviewUser;
};

const TourDetails = () => {
  const [tour, setTour] = useState<Tour>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const { id } = useParams();

  const paragraphs = tour?.description.split('\n');

  useEffect(() => {
    const fetchTour = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/tours/${id}`
      );
      setTour(data.data.data);
    };

    const fetchReviews = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/tours/${id}/reviews`
      );
      setReviews(data.data.data);
    };

    fetchTour();
    fetchReviews();
  }, [id]);

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          {tour?.imageCover && (
            <img
              src={`${remoteImg}/tours/${tour?.imageCover}`}
              alt={tour?.name}
              className="header__hero-img"
            />
          )}
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour?.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref={`${iconSvg}#icon-clock`}></use>
              </svg>
              <span className="heading-box__text">{`${tour?.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref={`${iconSvg}#icon-map-pin`}></use>
              </svg>
              <span className="heading-box__text">
                {tour?.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref={`${iconSvg}#icon-calendar`}></use>
                </svg>
                <span className="overview-box__label">Next date</span>
                <span className="overview-box__text">
                  {tour &&
                    new Date(tour.startDates[0]).toLocaleString('en-us', {
                      month: 'long',
                      year: 'numeric',
                    })}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref={`${iconSvg}#icon-trending-up`}></use>
                </svg>
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text">{tour?.difficulty}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref={`${iconSvg}#icon-user`}></use>
                </svg>
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">{`${tour?.maxGroupSize} people`}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref={`${iconSvg}#icon-star`}></use>
                </svg>
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">{`${tour?.ratingsAverage} / 5`}</span>
              </div>
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              {tour?.guides.map((guide) => (
                <div key={guide._id} className="overview-box__detail">
                  <img
                    src={`${remoteImg}/users/${guide.photo}`}
                    alt="Lead guide"
                    className="overview-box__img"
                  />
                  <span className="overview-box__label">{guide.role}</span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            About {tour?.name} tour
          </h2>
          {paragraphs?.map((paragraph, idx) => (
            <p key={idx} className="description__text">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section-pictures">
        {tour?.images &&
          tour?.images.map((image, idx) => (
            <div key={idx} className="picture-box">
              <img
                className={`picture-box__img picture-box__img--${idx + 1}`}
                src={`${remoteImg}/tours/${image}`}
                alt={`${tour.name} Tour ${idx + 1}`}
              />
            </div>
          ))}
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {reviews.map((review) => (
            <div key={review.id} className="reviews__card">
              <div className="reviews__avatar">
                <img
                  src={`${remoteImg}/users/${review.user.photo}`}
                  alt={review.user.name}
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">{review.user.name}</h6>
              </div>
              <p className="reviews__text">{review.review}</p>
              <div className="reviews__rating">
                {[1, 2, 3, 4, 5].map((star, idx) => (
                  <svg
                    key={idx}
                    className={`reviews__star reviews__star--${
                      review.rating >= star ? 'active' : 'inactive'
                    }`}
                  >
                    <use xlinkHref={`${iconSvg}#icon-star`}></use>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src={whiteLogo} alt="Natours logo" className="" />
          </div>
          {tour?.images && (
            <>
              <img
                src={`${remoteImg}/tours/${tour?.images[0]}`}
                alt=""
                className="cta__img cta__img--1"
              />
              <img
                src={`${remoteImg}/tours/${tour?.images[1]}`}
                alt=""
                className="cta__img cta__img--2"
              />
            </>
          )}

          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour?.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
            <button className="btn btn--green span-all-rows">
              Book tour now!
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetails;
