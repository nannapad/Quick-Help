import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import {
  MANUAL_DATA,
  getPendingManuals,
  approveManual,
  rejectManual,
  deleteManual,
} from "../data/manualdata";
import { USER_DATA } from "../data/userdata";
import { COMMENT_DATA } from "../data/commentdata";
import "./css/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [manuals, setManuals] = useState(MANUAL_DATA);
  const [users, setUsers] = useState(USER_DATA);
  const [comments, setComments] = useState(COMMENT_DATA);
  const [stats, setStats] = useState({
    totalManuals: 0,
    totalUsers: 0,
    totalComments: 0,
    totalViews: 0,
    totalLikes: 0,
    totalDownloads: 0,
  });
  const [pendingManuals, setPendingManuals] = useState([]);
  // UI state for enhanced dashboard
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [userRoleFilter, setUserRoleFilter] = useState("All");

  // Sparkline sample data (in real app use real metrics)
  const sparkData = {
    views: [120, 140, 130, 150, 160, 170, 180],
    users: [6, 8, 10, 12, 11, 13, 15],
    pending: [5, 7, 6, 8, 12, 11, 12],
    downloads: [20, 22, 25, 23, 28, 30, 32],
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    setCurrentUser(user);
    calculateStats();
    loadPendingManuals();
  }, [navigate]);

  // Recalculate when manuals/users change
  useEffect(() => {
    calculateStats();
    loadPendingManuals();
  }, [manuals, users]);

  const loadPendingManuals = () => {
    setPendingManuals(getPendingManuals());
  };

  const calculateStats = () => {
    const totalManuals = manuals.length;
    const totalUsers = users.length;
    const totalComments = comments.length;
    const totalViews = manuals.reduce((sum, manual) => sum + manual.views, 0);
    const totalLikes = manuals.reduce((sum, manual) => sum + manual.likes, 0);
    const totalDownloads = manuals.reduce(
      (sum, manual) => sum + manual.downloads,
      0
    );

    setStats({
      totalManuals,
      totalUsers,
      totalComments,
      totalViews,
      totalLikes,
      totalDownloads,
    });
  };

  const handleDeleteManual = (manualId) => {
    if (window.confirm("Are you sure you want to delete this manual?")) {
      deleteManual(manualId);
      const updatedManuals = manuals.filter((m) => m.id !== manualId);
      setManuals(updatedManuals);
      loadPendingManuals();
      calculateStats();
    }
  };

  const handleApproveManual = (manualId) => {
    approveManual(manualId);
    loadPendingManuals();
    setManuals(MANUAL_DATA);
    calculateStats();
  };

  const handleRejectManual = (manualId) => {
    if (window.confirm("Are you sure you want to reject this manual?")) {
      rejectManual(manualId);
      loadPendingManuals();
      calculateStats();
    }
  };
  const handleEditManual = (manualId) => {
    navigate(`/edit-manual/${manualId}`);
  };

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
  };
  const handleCreateManual = () => {
    navigate("/create-manual");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  // Compute filtered manuals for table (search, category, status, tab)
  const filteredManuals = manuals.filter((m) => {
    // tab filter (pending/approved/rejected)
    if (activeTab === "pending" && m.status !== "pending") return false;
    if (activeTab === "approved" && m.status !== "approved") return false;
    if (activeTab === "rejected" && m.status !== "rejected") return false;

    // search filter
    if (
      searchQuery &&
      !m.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // category filter
    if (categoryFilter !== "All" && m.category !== categoryFilter) return false;

    // status filter (when used independently)
    if (statusFilter !== "All" && m.status !== statusFilter) return false;

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredManuals.length / pageSize));
  const displayedManuals = filteredManuals.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Users list with submitted/rejected counts and displayRole
  const usersWithCounts = users
    .map((u) => {
      const submitted = MANUAL_DATA.filter(
        (m) => m.author && m.author.id === u.id
      ).length;
      const rejected = MANUAL_DATA.filter(
        (m) => m.author && m.author.id === u.id && m.status === "rejected"
      ).length;
      // derive display role: admin stays admin, users who submitted manuals become 'writer'
      const displayRole =
        u.role === "admin" ? "admin" : submitted > 0 ? "writer" : u.role;
      return { ...u, submitted, rejected, displayRole };
    })
    .filter((u) =>
      userRoleFilter === "All" ? true : u.displayRole === userRoleFilter
    );

  if (!currentUser) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <Container fluid className="dashboard-content">
        {/* KPI Stat Cards */}
        <Row className="mb-4 gx-3">
          {/* Card 1 - Total Views */}
          <Col md={3}>
            <Card className="stat-card dark">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small>Total Views</small>
                    <h3>{stats.totalViews}</h3>
                    <div className="trend up text-success">
                      +5.2% vs last 7 days
                    </div>
                  </div>
                  <div className="sparkline">
                    <svg width="80" height="34" viewBox="0 0 80 34">
                      <polyline
                        fill="none"
                        stroke="#A89BF5"
                        strokeWidth="2"
                        points="0,20 12,16 24,18 36,12 48,10 60,8 72,6 80,4"
                      />
                    </svg>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 2 - New Users */}
          <Col md={3}>
            <Card className="stat-card dark">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small>New Users (7d)</small>
                    <h3>{stats.totalUsers}</h3>
                    <div className="trend up text-success">
                      +3.8% vs last 7 days
                    </div>
                  </div>
                  <div className="sparkline">
                    <svg width="80" height="34" viewBox="0 0 80 34">
                      <polyline
                        fill="none"
                        stroke="#7CE0B3"
                        strokeWidth="2"
                        points="0,24 12,20 24,18 36,16 48,12 60,10 72,8 80,6"
                      />
                    </svg>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 3 - Pending Manuals */}
          <Col md={3}>
            <Card className="stat-card dark">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small>Pending Manuals</small>
                    <h3>{pendingManuals.length}</h3>
                    <div className="trend down text-warning">
                      +1.6% vs last 7 days
                    </div>
                  </div>
                  <div className="sparkline">
                    <svg width="80" height="34" viewBox="0 0 80 34">
                      <polyline
                        fill="none"
                        stroke="#FFD36B"
                        strokeWidth="2"
                        points="0,18 12,16 24,14 36,12 48,14 60,10 72,8 80,10"
                      />
                    </svg>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 4 - Downloads */}
          <Col md={3}>
            <Card className="stat-card dark">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small>Downloads</small>
                    <h3>{stats.totalDownloads}</h3>
                    <div className="trend up text-success">
                      +4.1% vs last 7 days
                    </div>
                  </div>
                  <div className="sparkline">
                    <svg width="80" height="34" viewBox="0 0 80 34">
                      <polyline
                        fill="none"
                        stroke="#9BD1FF"
                        strokeWidth="2"
                        points="0,22 12,20 24,18 36,16 48,14 60,12 72,10 80,8"
                      />
                    </svg>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Manuals Management - Tabs + Controls */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="management-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="tabs">
                    <Button
                      variant={activeTab === "pending" ? "dark" : "secondary"}
                      className="me-2"
                      onClick={() => handleTabChange("pending")}
                    >
                      Pending ({getPendingManuals().length})
                    </Button>
                    <Button
                      variant={activeTab === "approved" ? "dark" : "secondary"}
                      className="me-2"
                      onClick={() => handleTabChange("approved")}
                    >
                      Approved
                    </Button>
                    <Button
                      variant={activeTab === "rejected" ? "dark" : "secondary"}
                      onClick={() => handleTabChange("rejected")}
                    >
                      Rejected
                    </Button>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <InputGroup style={{ width: 280 }}>
                      <Form.Control
                      className="search-input"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setPage(1);
                        }}
                      />
                    </InputGroup>
                    <Form.Select
                      value={categoryFilter}
                      onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setPage(1);
                      }}
                      style={{ width: 160 }}
                    >
                      <option>All</option>
                      {[...new Set(manuals.map((m) => m.category))].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                      }}
                      style={{ width: 140 }}
                    >
                      <option>All</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="draft">Draft</option>
                    </Form.Select>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedManuals.map((manual) => (
                        <tr key={manual.id}>
                          <td>
                            <div className="manual-info">
                              <img
                                src={manual.thumbnail}
                                alt={manual.title}
                                className="manual-thumb"
                              />
                              <div>
                                <strong>{manual.title}</strong>
                                <br />
                                <small>
                                  {manual.description.substring(0, 50)}...
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>{manual.author.name}</td>
                          <td>
                            <Badge bg="primary">{manual.category}</Badge>
                          </td>
                          <td>
                            {manual.status === "draft" ? (
                              <Badge bg="warning" text="dark">
                                <i className="bi bi-pencil-square me-1"></i>
                                Draft
                              </Badge>
                            ) : manual.status === "pending" ? (
                              <Badge bg="info">
                                <i className="bi bi-clock me-1"></i>Pending
                              </Badge>
                            ) : manual.status === "approved" ? (
                              <Badge bg="success">
                                <i className="bi bi-check-circle me-1"></i>
                                Approved
                              </Badge>
                            ) : (
                              <Badge bg="danger">
                                <i className="bi bi-x-circle me-1"></i>Rejected
                              </Badge>
                            )}
                          </td>
                          <td>{manual.views}</td>
                          <td>{manual.likes}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleEditManual(manual.id)}
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteManual(manual.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Pagination controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <Form.Select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(parseInt(e.target.value));
                        setPage(1);
                      }}
                      style={{ width: 120 }}
                    >
                      <option value={5}>5 / page</option>
                      <option value={8}>8 / page</option>
                      <option value={12}>12 / page</option>
                    </Form.Select>
                  </div>
                  <Pagination className="mb-0">
                    <Pagination.Prev
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i}
                        active={i + 1 === page}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    />
                  </Pagination>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Users Management (kept) */}
          <Col lg={4}>
            <Card className="management-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Users Management</h3>
                  <Form.Select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    style={{ width: 160 }}
                  >
                    <option value="All">Filter by Role</option>
                    <option value="admin">Admin</option>
                    <option value="writer">Writer</option>
                    <option value="user">User</option>
                  </Form.Select>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="users-list">
                  {usersWithCounts.map((user) => (
                    <div key={user.id} className="user-item">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="user-avatar"
                      />
                      <div className="user-info">
                        <div className="user-name">
                          {user.firstName} {user.lastName}
                          <Badge
                            bg={
                              user.displayRole === "admin"
                                ? "danger"
                                : user.displayRole === "writer"
                                ? "primary"
                                : "secondary"
                            }
                            className="ms-2"
                          >
                            {user.displayRole}
                          </Badge>
                        </div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-stats">
                          <small className="me-2">
                            Submitted: <strong>{user.submitted}</strong>
                          </small>
                          <small className="text-danger">
                            Rejected: <strong>{user.rejected}</strong>
                          </small>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          user.isActive ? "outline-danger" : "outline-success"
                        }
                        onClick={() => handleToggleUserStatus(user.id)}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
