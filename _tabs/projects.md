---
layout: page
icon: fas fa-folder-open
order: 2
panel: false
---
<!-- 
<div class="projects-intro mb-5">
  <p>A collection of projects I've built, ranging from web applications to open-source contributions. Each project showcases different skills and technologies.</p>
</div> -->

<div class="row row-cols-1 row-cols-md-2 g-4">
  {% assign sorted_projects = site.projects | sort: 'order' %}
  {% for project in sorted_projects %}
    <div class="col">
      <div class="card h-100 project-card">
        {% if project.image %}
          <img src="{{ project.image | relative_url }}" class="card-img-top" alt="{{ project.title }}">
        {% endif %}
        
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">
            <a href="{{ project.url | relative_url }}" class="stretched-link">{{ project.title }}</a>
          </h5>
          
          {% if project.description %}
            <p class="card-text text-muted flex-grow-1">{{ project.description }}</p>
          {% endif %}
          
          {% if project.tags and project.tags.size > 0 %}
            <div class="project-tags mt-3">
              {% for tag in project.tags limit:3 %}
                <span class="badge bg-secondary me-1">{{ tag }}</span>
              {% endfor %}
              {% if project.tags.size > 3 %}
                <span class="badge bg-secondary">+{{ project.tags.size | minus: 3 }}</span>
              {% endif %}
            </div>
          {% endif %}

          {% if project.github or project.itchio %}
            <div class="project-quick-links mt-3 pt-3 border-top">
              {% if project.github %}
                <a href="{{ project.github }}" class="text-muted me-3" target="_blank" rel="noopener" onclick="event.stopPropagation()">
                  <i class="fab fa-github"></i> GitHub
                </a>
              {% endif %}
              {% if project.itchio %}
                <a href="{{ project.itchio }}" class="text-muted" target="_blank" rel="noopener" onclick="event.stopPropagation()">
                  <i class="fa-brands fa-itch-io"></i> itch.io
                </a>
              {% endif %}
            </div>
          {% endif %}
        </div>
      </div>
    </div>
  {% endfor %}
</div>

<style>
.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--bs-border-color);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Light mode styles */
html:[data-mode="light"] .project-card {
  background-color: #f8f9fa;
}

/* Dark mode styles */
html:not([data-mode="light"]) .project-card {
  background-color: #1e1e1e;
  color: rgb(255 255 255 / 95%);
}

.project-card > a:has(.card-img-top) {
  margin: 0!important;
}

.project-card .card-img-top {
  height: 200px;
  object-fit: cover;
}

.project-card .card-title a {
  color: inherit;
  text-decoration: none;
}

.project-card .card-title a:hover {
  color: var(--link-color);
}

.project-tags .badge {
  font-weight: 500;
  font-size: 0.75rem;
}

.project-quick-links a {
  font-size: 0.875rem;
  text-decoration: none;
}

.project-quick-links a:hover {
  color: var(--link-color) !important;
}
</style>