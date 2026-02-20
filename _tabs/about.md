---
# the default layout is 'page'
icon: fas fa-info-circle
order: 0
panel: false
education_timeline:
  - date: 2023 - present
    title: Breda University of Applied Sciences
    position: Creative Media and Game Technologies (Programming Track)
    detail: 
experience_timeline:
  - date: 2024 - present
    title: Techniekmaker
    position: Junior Project Officer
    detail: Maintaining website and webshop, implementing custom Wordpress plugins for lesson plan creation.
  - date: 2023 - present
    title: Team Cyberweb - First Robotics Competition Team
    position: Software Engineer & Outreach
    detail: >
        Under strict rules, limited time and resources, teams around the world build industrial robots that perform various tasks within a competition.

        In addition to my role as a Java programmer, I am also active on the team as an engineer and work with our educational and industry partners in the region.
  - date: 2019 - 2023
    title: GentleBotz - First Tech Challenge Team
    position: Software Engineer & Outreach
    detail: >
        In FTC you learn to develop a robot in a team that has to score points by completing various tasks.
        
        At GentleBotz I was a programmer for 4 years and made sure the robot could be controlled autonomously and manually in Java.

        In 2023, after winning the Inspire Award, we competed at the world championships in Houston, TX.
---

## About

<div class="about-hero">
	<img class="about-avatar" src="{{ site.avatar | relative_url }}" alt="Juul Harks">
	<div>
		<p class="about-intro">
			Hi, I'm Juul Harks, an Engine & Tools programmer studying Creative Media and Game Technologies at Breda University of Applied Sciences. I focus on building reliable engine features, editor tools, and pipelines that make teams faster and games more stable. I enjoy working at the intersection of low level systems and practical workflows, and I like collaborating closely with artists and designers to ship tools that solve real issues.
		</p>
		<p class="about-intro">
			I am currently looking for an internship starting Summer 2026.
		</p>
	</div>
</div>

## Skills and Tools

- Unreal Engine, Unity, Custom Engines
- C++, C#, Python
- GitHub, Perforce, Jenkins

## Education

<div class="about-timeline">
	{% if page.education_timeline %}
		{% for item in page.education_timeline %}
			<div class="about-timeline-item">
				<div class="about-timeline-date">{{ item.date }}</div>
				<div class="about-timeline-content">
					<strong>{{ item.title }}</strong>
					<div class="about-timeline-position">{{ item.position }}</div>
					<div class="about-timeline-detail">{{ item.detail | markdownify }}</div>
				</div>
			</div>
		{% endfor %}
	{% endif %}
</div>

## Experience

<div class="about-timeline">
	{% if page.experience_timeline %}
		{% for item in page.experience_timeline %}
			<div class="about-timeline-item">
				<div class="about-timeline-date">{{ item.date }}</div>
				<div class="about-timeline-content">
					<strong>{{ item.title }}</strong>
					<div class="about-timeline-position">{{ item.position }}</div>
					<div class="about-timeline-detail">{{ item.detail | markdownify }}</div>
				</div>
			</div>
		{% endfor %}
	{% endif %}
</div>

## Awards and Achievements

- **Inspire Award, First Tech Challenge Benelux 2023**  
  [BN DeStem: Bredase scholieren met pylonnenrobot naar WK in Houston](https://www.bndestem.nl/breda/bredase-scholieren-met-pylonnenrobot-naar-wk-in-houston-als-ze-genoeg-geld-ophalen~a458e100/){:target="_blank"}
  > This formally judged award is given to the team that truly embodied the ‘challenge’ of the FTC program. The team that receives this award is chosen by the judges as having best represented a ‘role-model‘ FTC Team. This team is a top contender for all other judging categories and is a strong competitor on the field. The Inspire Award Winner is an inspiration to other teams, acting with Gracious Professionalism™ both on and off the playing field. This team is able to communicate their experiences, enthusiasm and knowledge to other teams, sponsors, and the Judges. Working as a unit, this team will have demonstrated success in accomplishing the task of creating a working and competitive robot.

  <img src="/assets/img/gentlebotz-robot.jpg" alt="First Tech Challenge Robot of FTC Team GentleBotz">
  *First Tech Challenge Robot of FTC Team GentleBotz*

## Links

- Email: [juul@sharks.nl](mailto:juul@sharks.nl)
- GitHub: [github.com/JuulH](https://github.com/JuulH)
- LinkedIn: [linkedin.com/in/juulharks](https://www.linkedin.com/in/juulharks)
- Resume: [Download]({{site.resume_url}}){:target="_blank"}

<style>
.about-hero {
	display: grid;
	grid-template-columns: 140px 1fr;
	gap: 1.5rem;
	align-items: start;
	margin-bottom: 1.5rem;
}

.about-avatar {
	width: 140px;
	height: 150px;
	border-radius: 1rem;
	object-fit: cover;
	object-position: 50% 30%;
	border: 1px solid var(--bs-border-color);
	background: var(--card-bg);
}

.about-intro {
	margin: 0 0 0.75rem 0;
}

.about-timeline {
	border-left: 2px solid var(--bs-border-color);
	padding-left: 1.5rem;
	display: grid;
	gap: 1.25rem;
}

.about-timeline-item {
	position: relative;
}

.about-timeline-item::before {
	content: "";
	position: absolute;
	left: -2rem;
	top: 0.35rem;
	width: 0.75rem;
	height: 0.75rem;
	border-radius: 50%;
	background: var(--card-bg);
	border: 2px solid var(--link-color);
}

.about-timeline-date {
	font-weight: 600;
	color: var(--text-muted-color);
	font-size: 0.9rem;
}

.about-timeline-content strong {
	display: block;
	margin-bottom: 0.25rem;
}

.about-timeline-position {
	font-weight: 600;
	color: var(--text-color);
	margin-bottom: 0.35rem;
}

.about-timeline-detail {
	color: var(--text-muted-color);
}

.about-timeline-detail p {
	margin: 0.35rem 0 0;
}

@media (max-width: 768px) {
	.about-hero {
		grid-template-columns: 1fr;
	}

	.about-avatar {
		width: 120px;
		height: 120px;
	}
}
</style>
