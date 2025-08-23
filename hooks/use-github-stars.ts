"use client";

import { useState, useEffect } from 'react';

interface GitHubStarsData {
  stars: number;
  loading: boolean;
  error: string | null;
  formattedStars: string;
}

export const useGitHubStars = (repoOwner: string, repoName: string): GitHubStarsData => {
  const [stars, setStars] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatStars = (starCount: number): string => {
    if (starCount < 100) {
      return starCount.toString();
    } else if (starCount < 1000) {
      return Math.floor(starCount / 100) * 100 + '+';
    } else if (starCount < 10000) {
      return (starCount / 1000).toFixed(1) + 'k';
    } else {
      return (starCount / 1000).toFixed(0) + 'k';
    }
  };

  useEffect(() => {
    const fetchStars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          // Add cache control to get fresh data
          cache: 'no-cache',
        });
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        setStars(data.stargazers_count || 0);
      } catch (err) {
        console.error('Error fetching GitHub stars:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch stars');
        // Fallback to a reasonable number if API fails
        setStars(1200);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();

    // Refresh stars every 5 minutes for real-time updates
    const interval = setInterval(fetchStars, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [repoOwner, repoName]);

  return {
    stars,
    loading,
    error,
    formattedStars: formatStars(stars),
  };
};
