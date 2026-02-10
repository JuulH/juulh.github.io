---
layout: page
icon: fas fa-folder-open
order: 1
panel: false
---
<!-- 
<div class="projects-intro mb-5">
  <p>A collection of projects I've built, ranging from web applications to open-source contributions. Each project showcases different skills and technologies.</p>
</div> -->

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
  {% assign sorted_projects = site.projects | sort: 'order' %}
  {% for project in sorted_projects %}
    <div class="col">
      {% include project-card.html project=project %}
    </div>
  {% endfor %}
</div>

{% include project-card-styles.html %}