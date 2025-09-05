const API_BASE_URL = 'http://localhost:8000/api';

class EducationAPI {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.access_token;
        localStorage.setItem('authToken', this.token);
        return { success: true, ...data };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
      this.token = null;
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  isAuthenticated() {
    return !!this.token;
  }

  // Navbar
  async getNavbarItems() {
    return this.request('/navbar');
  }

  async createNavbarItem(item) {
    return this.request('/navbar', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  }

  async updateNavbarItem(id, item) {
    return this.request(`/navbar/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item)
    });
  }

  async deleteNavbarItem(id) {
    return this.request(`/navbar/${id}`, { method: 'DELETE' });
  }

  // Hero Sliders
  async getHeroSliders() {
    return this.request('/hero-sliders');
  }

  async createHeroSlider(slider) {
    return this.request('/hero-sliders', {
      method: 'POST',
      body: JSON.stringify(slider)
    });
  }

  async updateHeroSlider(id, slider) {
    return this.request(`/hero-sliders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(slider)
    });
  }

  async deleteHeroSlider(id) {
    return this.request(`/hero-sliders/${id}`, { method: 'DELETE' });
  }

  // Statistics
  async getStatistics() {
    return this.request('/statistics');
  }

  async createStatistic(stat) {
    return this.request('/statistics', {
      method: 'POST',
      body: JSON.stringify(stat)
    });
  }

  async updateStatistic(id, stat) {
    return this.request(`/statistics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stat)
    });
  }

  async deleteStatistic(id) {
    return this.request(`/statistics/${id}`, { method: 'DELETE' });
  }

  // Why Choose Us
  async getWhyChooseUs() {
    return this.request('/why-choose');
  }

  async createWhyChooseUs(feature) {
    return this.request('/why-choose', {
      method: 'POST',
      body: JSON.stringify(feature)
    });
  }

  async updateWhyChooseUs(id, feature) {
    return this.request(`/why-choose/${id}`, {
      method: 'PUT',
      body: JSON.stringify(feature)
    });
  }

  async deleteWhyChooseUs(id) {
    return this.request(`/why-choose/${id}`, { method: 'DELETE' });
  }

  // Programs
  async getPrograms() {
    return this.request('/programs');
  }

  async createProgram(program) {
    return this.request('/programs', {
      method: 'POST',
      body: JSON.stringify(program)
    });
  }

  async updateProgram(id, program) {
    return this.request(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program)
    });
  }

  async deleteProgram(id) {
    return this.request(`/programs/${id}`, { method: 'DELETE' });
  }

  // Alumni Testimonials
  async getAlumniTestimonials() {
    return this.request('/alumni-testimonials');
  }

  async createAlumniTestimonial(testimonial) {
    return this.request('/alumni-testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial)
    });
  }

  async updateAlumniTestimonial(id, testimonial) {
    return this.request(`/alumni-testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial)
    });
  }

  async deleteAlumniTestimonial(id) {
    return this.request(`/alumni-testimonials/${id}`, { method: 'DELETE' });
  }

  // Alumni Showcase
  async getAlumniShowcase() {
    return this.request('/alumni-showcase');
  }

  async createAlumniShowcase(alumni) {
    return this.request('/alumni-showcase', {
      method: 'POST',
      body: JSON.stringify(alumni)
    });
  }

  async updateAlumniShowcase(id, alumni) {
    return this.request(`/alumni-showcase/${id}`, {
      method: 'PUT',
      body: JSON.stringify(alumni)
    });
  }

  async deleteAlumniShowcase(id) {
    return this.request(`/alumni-showcase/${id}`, { method: 'DELETE' });
  }

  // News Articles
  async getNewsArticles() {
    return this.request('/news');
  }

  async createNewsArticle(article) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(article)
    });
  }

  async updateNewsArticle(id, article) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article)
    });
  }

  async deleteNewsArticle(id) {
    return this.request(`/news/${id}`, { method: 'DELETE' });
  }

  // Logos
  async getLogos() {
    return this.request('/logos');
  }

  async createLogo(logo) {
    return this.request('/logos', {
      method: 'POST',
      body: JSON.stringify(logo)
    });
  }

  async updateLogo(id, logo) {
    return this.request(`/logos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(logo)
    });
  }

  async deleteLogo(id) {
    return this.request(`/logos/${id}`, { method: 'DELETE' });
  }

  // Legacy methods for backward compatibility
  async getAll(table) {
    const methodMap = {
      navbarItems: 'getNavbarItems',
      heroSliders: 'getHeroSliders',
      statistics: 'getStatistics',
      whyChooseUs: 'getWhyChooseUs',
      programs: 'getPrograms',
      alumniTestimonials: 'getAlumniTestimonials',
      alumniShowcase: 'getAlumniShowcase',
      newsArticles: 'getNewsArticles',
      logos: 'getLogos'
    };
    
    const method = methodMap[table];
    if (method) {
      return this[method]();
    }
    return [];
  }

  async create(table, item) {
    const methodMap = {
      navbarItems: 'createNavbarItem',
      heroSliders: 'createHeroSlider',
      statistics: 'createStatistic',
      whyChooseUs: 'createWhyChooseUs',
      programs: 'createProgram',
      alumniTestimonials: 'createAlumniTestimonial',
      alumniShowcase: 'createAlumniShowcase',
      newsArticles: 'createNewsArticle',
      logos: 'createLogo'
    };
    
    const method = methodMap[table];
    if (method) {
      return this[method](item);
    }
    return null;
  }

  async update(table, id, item) {
    const methodMap = {
      navbarItems: 'updateNavbarItem',
      heroSliders: 'updateHeroSlider',
      statistics: 'updateStatistic',
      whyChooseUs: 'updateWhyChooseUs',
      programs: 'updateProgram',
      alumniTestimonials: 'updateAlumniTestimonial',
      alumniShowcase: 'updateAlumniShowcase',
      newsArticles: 'updateNewsArticle',
      logos: 'updateLogo'
    };
    
    const method = methodMap[table];
    if (method) {
      return this[method](id, item);
    }
    return null;
  }

  async delete(table, id) {
    const methodMap = {
      navbarItems: 'deleteNavbarItem',
      heroSliders: 'deleteHeroSlider',
      statistics: 'deleteStatistic',
      whyChooseUs: 'deleteWhyChooseUs',
      programs: 'deleteProgram',
      alumniTestimonials: 'deleteAlumniTestimonial',
      alumniShowcase: 'deleteAlumniShowcase',
      newsArticles: 'deleteNewsArticle',
      logos: 'deleteLogo'
    };
    
    const method = methodMap[table];
    if (method) {
      return this[method](id);
    }
    return null;
  }
}

export const api = new EducationAPI();