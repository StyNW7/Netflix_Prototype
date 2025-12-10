"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeaturedMovie from "@/components/home/featured-movie"
import GenreMenu from "@/components/home/genre-menu"
import SearchBar from "@/components/home/search-bar"
import MovieCarousel from "@/components/home/movie-carousel"

export default function HomePage() {
  const [activeGenre, setActiveGenre] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const genres = ["All", "Trending", "Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"]

  const movieSections = [
    { title: "Featured For You", id: "featured" },
    { title: "Top Trending Now", id: "trending" },
    { title: "Action & Adventure", id: "action" },
    { title: "Award-Winning Drama", id: "drama" },
    { title: "Comedy Hits", id: "comedy" },
    { title: "Thrilling Horror", id: "horror" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Featured Movie */}
      <FeaturedMovie />

      {/* Search Bar */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Genre Menu */}
      <GenreMenu activeGenre={activeGenre} genres={genres} onGenreChange={setActiveGenre} />

      {/* Movie Carousels */}
      <div className="pt-8 pb-20">
        {movieSections.map((section) => (
          <MovieCarousel key={section.id} title={section.title} genreId={section.id} />
        ))}
      </div>

      <Footer />
    </div>
  )
}
